<script setup>
  import MCFrame from "@/components/MCFrame.vue";
  import { usePageStore } from "@/store/page";
  import { ENV_BASE_URL } from "@/utils/env";
  import { onMounted, reactive, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useReCaptcha } from "vue-recaptcha-v3";
  import { RouterLink, useRoute, useRouter } from "vue-router";
  import axios from "axios";

  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

  const pageStore = usePageStore();

  const { t } = useI18n();

  const strof = (str, maxlen) => {
    if (str.length > maxlen) {
      return str.substring(0, maxlen) + "...";
    } else {
      return str;
    }
  };

  const datetimeFormat = (datetime) => {
    const date = new Date(datetime);
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0")
    );
  };

  onMounted(async () => {
    pageStore.setPageLoadingState(true);
    await fetchData();
    pageStore.setPageLoadingState(false);
  });

  const route = useRoute();
  const router = useRouter();

  const sortBy = ref(1);
  const sortType = ref(4);

  const modpackList = ref([]);

  const fetchData = async () => {
    // get mod id list from param `ids`
    const modIdList = route.params.ids.split(",");
    // if mod id list is empty, redirect to home page
    if (modIdList.length === 0) {
      router.replace("/");
      return;
    }
    // if mod id is not pure number, redirect to home page
    for (const modId of modIdList) {
      if (isNaN(Number(modId))) {
        router.replace("/");
        return;
      }
    }

    await recaptchaLoaded();

    const token = await executeRecaptcha("mod_overview");

    const { data: _ret } = await axios.post(
      ENV_BASE_URL + "/v1/focessapi/minecraft/modpack/depend",
      {
        recaptcha: token,
        ids: modIdList,
        sortBy: sortBy.value,
        sortType: sortType.value,
      }
    );

    modpackList.value = _ret;
  };
</script>

<template>
  <div>
    <Teleport to="#header-slot">
      <RouterLink to="/" class="header-link">{{
        t("header.toolbar.home")
      }}</RouterLink>
    </Teleport>
    <div class="modpack-wrapper">
      <div v-if="modpackList.length == 0" class="no-match-modpack">
        {{ t("search.no-match-modpack") }}
      </div>
      <div v-else class="modpack-list">
        <a
          v-for="modpack of modpackList"
          :key="modpack.id"
          :href="modpack.url"
          target="_blank"
        >
          <MCFrame class="modpack-item">
            <div class="top">
              <img :src="modpack.logoUrl" class="image" />
              <div class="detail">
                <div class="name">{{ modpack.name }}</div>
                <div v-if="modpack.authors.length > 0" class="author">
                  {{
                    t("home.searchbar.createby", [
                      strof(modpack.authors[0].name, 7),
                    ])
                  }}
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="summary-item">
                <span class="label">{{ t("search.latest-game-version") }}</span>
                <span class="value">
                  <template v-if="modpack.latestGameVersions.length > 0">
                    {{
                      modpack.latestGameVersions.map((i) => i.name).join(" ")
                    }}
                  </template>
                  <template>{{ t("search.unknown") }}</template>
                </span>
              </div>
              <div class="summary-item">
                <span class="label">{{ t("search.mod-count") }}</span>
                <span class="value">
                  {{ modpack.dependenciesSize }}
                </span>
              </div>
              <div class="summary-item">
                <span class="label">{{ t("search.download-count") }}</span>
                <span class="value">
                  {{ modpack.downloadCount }}
                </span>
              </div>
              <div class="summary-item">
                <span class="label">{{ t("search.create-time") }}</span>
                <span class="value">
                  {{ datetimeFormat(modpack.createTime) }}
                </span>
              </div>
              <div class="summary-item">
                <span class="label">{{ t("search.update-time") }}</span>
                <span class="value">
                  {{ datetimeFormat(modpack.modifyTime) }}
                </span>
              </div>
            </div>
          </MCFrame>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .modpack-list {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
    @apply gap-2;
    @apply mb-5;

    .modpack-item {
      &:deep(.mcframe__main) {
        @apply flex p-1 pr-3 relative flex-col gap-y-2;
      }

      .top {
        @apply flex;
        .image {
          @apply w-80px h-80px flex-shrink-0 mr-2;
          @apply object-cover;
        }

        .detail {
          @apply flex flex-col justify-between;
        }
      }

      .bottom {
        .summary-item {
          @apply flex justify-between;
          .label {
            @apply text-gray-700;
            @apply select-none;
          }
          .value {
            @apply text-gray-500;
          }
        }
      }
    }
  }
</style>

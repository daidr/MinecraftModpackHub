<script setup>
  import { useI18n } from "vue-i18n";
  import { Icon } from "@iconify/vue";
  import MCFrame from "./MCFrame.vue";
  import { ref, watch } from "vue";
  import LoadingIcon from "./LoadingIcon.vue";
  import axios from "axios";
  import { useReCaptcha } from "vue-recaptcha-v3";
  import { ENV_BASE_URL } from "@/utils/env";
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

  const { t } = useI18n();

  const strof = (str, maxlen) => {
    if (str.length > maxlen) {
      return str.substring(0, maxlen) + "...";
    } else {
      return str;
    }
  };

  // 防抖函数
  const debounce = (fn, delay = 500) => {
    let timer = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    };
  };

  const searchText = ref("");
  const showResultPanel = ref(false);
  const isLoading = ref(false);
  const result = ref([]);
  const mouseInPanel = ref(false);

  const searchHandler = debounce(function (keyword) {
    fetchModList(keyword);
  });

  watch(
    () => searchText.value,
    (val) => {
      if (val != "") {
        searchHandler(val);
      } else {
        showResultPanel.value = false;
      }
    }
  );

  // cancel token
  let CancelToken = null;

  const fetchModList = async (keyword) => {
    isLoading.value = true;
    // cancel old request
    if (CancelToken) {
      CancelToken.cancel();
    }

    await recaptchaLoaded();

    const token = await executeRecaptcha("mod_overview");

    // create new cancel token
    CancelToken = axios.CancelToken.source();

    try {
      const { data: _ret } = await axios.post(
        ENV_BASE_URL + "/v1/focessapi/minecraft/mod/search",
        {
          recaptcha: token,
          sortBy: 1,
          sortType: 4,
          keyword,
        },
        {
          cancelToken: CancelToken.token,
        }
      );

      result.value = _ret;
    } catch (error) {
      console.log(error);
    }
    isLoading.value = false;
  };

  const tryShowResultPanel = () => {
    showResultPanel.value = true;
  };

  const tryHideResultPanel = () => {
    if (!mouseInPanel.value) {
      showResultPanel.value = false;
    }
  };

  const emit = defineEmits(["add-mod"]);

  const onModItemClick = (mod) => {
    emit("add-mod", mod);
    showResultPanel.value = false;
    searchText.value = "";
    result.value = [];
  };
</script>

<template>
  <div class="search-bar">
    <MCFrame>
      <input
        v-model.trim="searchText"
        class="search-input"
        type="text"
        :placeholder="t('home.searchbar.placeholder')"
        @focus="tryShowResultPanel()"
        @blur="tryHideResultPanel()"
      />
    </MCFrame>
    <Transition name="fade">
      <MCFrame
        v-if="showResultPanel"
        class="float-panel"
        @pointerenter="mouseInPanel = true"
        @pointerleave="mouseInPanel = false"
      >
        <div v-if="isLoading" class="loading"><LoadingIcon></LoadingIcon></div>
        <template v-else>
          <div v-if="result.length == 0" class="no-match">
            {{ t("home.searchbar.no-match") }}
          </div>
          <div v-else class="mod-list">
            <div
              v-for="mod of result"
              :key="mod.id"
              class="mod-item"
              @click="onModItemClick(mod)"
            >
              <div class="left">
                <div class="image">
                  <img
                    :src="
                      mod.logoUrl ||
                      `${ENV_BASE_URL}/v1/focessapi/minecraft/mod/logo/${mod.id}`
                    "
                  />
                </div>
                <div class="detail">
                  <div class="name">{{ strof(mod.name, 30) }}</div>
                  <div v-if="mod.latestGameVersions.length > 0" class="version">
                    <template
                      v-for="gameVersion of mod.latestGameVersions.slice(0, 5)"
                    >
                      {{ gameVersion.name }}&nbsp;
                    </template>
                  </div>
                </div>
              </div>
              <div v-if="mod.authors.length !== 0" class="right">
                {{
                  t("home.searchbar.createby", [strof(mod.authors[0].name, 7)])
                }}
              </div>
            </div>
          </div>
        </template>
      </MCFrame>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .search-bar {
    @apply h-46px;
    .search-input {
      @apply bg-transparent border-transparent;
      @apply px-2 md:px-10;
      @apply w-full;
      @apply text-lg;
    }
  }

  .float-panel {
    @apply mt-1 relative z-10;
    filter: drop-shadow(0 1rem 1rem rgba(0, 0, 0, 0.5));

    &:deep(.mcframe__main) {
      @apply max-h-50vh overflow-auto;
    }

    .loading {
      @apply flex justify-center items-center py-5 text-5xl;
    }

    .no-match {
      @apply text-center;
    }

    .mod-list {
      @apply select-none;
      .mod-item {
        @apply flex justify-between py-1 px-1;

        &:hover {
          @apply bg-primary/10 cursor-pointer;
        }

        .left {
          @apply flex;
          .image {
            @apply mr-2;
            @apply flex-shrink-0;
            img {
              @apply h-50px w-50px object-cover;
            }
          }

          .detail {
            @apply flex flex-col justify-center;
            .name {
              @apply whitespace-nowrap overflow-hidden overflow-ellipsis max-w-70vw;
            }

            .version {
              @apply text-primary/60;
            }
          }
        }

        .right {
          @apply hidden md:block;
        }
      }
    }
  }
</style>

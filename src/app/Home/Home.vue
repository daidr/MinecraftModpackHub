<script setup>
  import MCButton from "@/components/MCButton.vue";
  import MCFrame from "@/components/MCFrame.vue";
  import { useMessage } from "@/components/Message";
  import SearchBar from "@/components/SearchBar.vue";
  import { usePageStore } from "@/store/page";
  import { ENV_BASE_URL } from "@/utils/env";
  import { Icon } from "@iconify/vue";
  import { onMounted, reactive, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { RouterLink, useRouter } from "vue-router";

  const pageStore = usePageStore();

  const { success } = useMessage();

  const strof = (str, maxlen) => {
    if (str.length > maxlen) {
      return str.substring(0, maxlen) + "...";
    } else {
      return str;
    }
  };

  const router = useRouter();

  const { t } = useI18n();

  onMounted(async () => {
    // pageStore.setPageLoadingState(true)
    // const _result = await callbackUid(123456)
    // uid.value = _result.data.uid
    // pageStore.setPageLoadingState(false)
  });

  const modList = reactive(JSON.parse(localStorage.getItem("modList")) || []);

  const onModAdded = (mod) => {
    // 检查是否有 id 重复的 mod
    const _mod = modList.find((item) => item.id === mod.id);
    if (!_mod) {
      // 如果没有，就把 mod 添加到列表
      modList.push(mod);
      localStorage.setItem("modList", JSON.stringify(modList));
      success(t("home.modlist.added"));
    }
  };

  const onModRemoveBtnClick = (modid) => {
    const _modIndex = modList.findIndex((item) => item.id === modid);
    if (_modIndex !== -1) {
      modList.splice(_modIndex, 1);
      localStorage.setItem("modList", JSON.stringify(modList));
      success(t("home.modlist.removed"));
    }
  };

  const onSearchBtnClick = () => {
    // get mod list
    const modIdList = modList.map((item) => item.id);
    const modIdString = modIdList.join(",");
    router.push({
      name: "search",
      params: {
        ids: modIdString,
      },
    });
  };
</script>

<template>
  <Teleport to="#header-slot">
    <RouterLink to="/status" class="header-link">{{
      t("header.toolbar.status")
    }}</RouterLink>
  </Teleport>
  <MCFrame class="protips">
    <p class="title">{{ t("home.protips.title") }}</p>
    <p class="desc">{{ t("home.protips.desc") }}</p>
  </MCFrame>
  <SearchBar @add-mod="onModAdded"></SearchBar>
  <div class="mod-list">
    <MCFrame v-for="mod of modList" :key="mod.id" class="mod-item">
      <div class="icon" @click="onModRemoveBtnClick(mod.id)">
        <Icon icon="pixelarticons:close"></Icon>
      </div>
      <img
        class="image"
        :src="
          mod.logoUrl ||
          `${ENV_BASE_URL}/v1/focessapi/minecraft/mod/logo/${mod.id}`
        "
      />
      <div class="detail">
        <div class="name">{{ mod.name }}</div>
        <div v-if="mod.authors.length !== 0" class="author">
          {{ t("home.searchbar.createby", [strof(mod.authors[0].name, 7)]) }}
        </div>
      </div>
    </MCFrame>
  </div>
  <div class="btn-wrapper">
    <MCButton :disabled="modList.length == 0" @click="onSearchBtnClick">{{
      t("home.searchbtn")
    }}</MCButton>
  </div>
</template>

<style scoped lang="scss">
  .protips {
    &:deep(.mcframe__main) {
      @apply py-1 px-2 md:px-10;
    }

    .title {
      @apply font-bold text-xl;
    }
  }

  .mod-list {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
    @apply gap-2;

    .mod-item {
      &:deep(.mcframe__main) {
        @apply flex p-1 pr-3 relative;
      }

      .image {
        @apply w-90px h-90px flex-shrink-0 mr-2;
        @apply object-cover;
      }

      .detail {
        @apply flex flex-col justify-between;
      }

      .icon {
        @apply absolute top-0 right-0 text-lg;
        @apply cursor-pointer transition;

        &:hover {
          @apply bg-red-700 text-white;
        }
      }
    }
  }

  .btn-wrapper {
    @apply flex justify-center mt-4;

    &:deep(.mcbutton__main) {
      @apply py-1 px-2;
    }
  }
</style>

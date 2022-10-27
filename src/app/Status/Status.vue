<script setup>
  import MCFrame from "@/components/MCFrame.vue";
  import { usePageStore } from "@/store/page";
  import { ENV_BASE_URL } from "@/utils/env";
  import { onMounted, reactive, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useReCaptcha } from "vue-recaptcha-v3";
  import { RouterLink } from "vue-router";
  import axios from "axios";

  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

  const pageStore = usePageStore();

  const { t } = useI18n();

  onMounted(async () => {
    pageStore.setPageLoadingState(true);
    await fetchData();
    pageStore.setPageLoadingState(false);
  });

  const result = reactive({
    availableMods: NaN,
    availableModpacks: NaN,
    notAvailableModpacks: NaN,
    notEmptyModpacks: NaN,
  });

  const fetchData = async () => {
    await recaptchaLoaded();

    const token = await executeRecaptcha("mod_overview");

    const { data: _ret } = await axios.post(
      ENV_BASE_URL + "/v1/focessapi/minecraft/overview",
      {
        recaptcha: token,
      }
    );

    result.availableMods = _ret.availableMods;
    result.availableModpacks = _ret.availableModpacks;
    result.notAvailableModpacks = _ret.notAvailableModpacks;
    result.notEmptyModpacks = _ret.notEmptyModpacks;
  };
</script>

<template>
  <div>
    <Teleport to="#header-slot">
      <RouterLink to="/" class="header-link">{{
        t("header.toolbar.home")
      }}</RouterLink>
    </Teleport>
    <div class="status-wrapper">
      <MCFrame class="status-item">
        <p class="title">{{ t("status.title.availableMods") }}</p>
        <p class="data">{{ result.availableMods }}</p>
      </MCFrame>
      <MCFrame class="status-item">
        <p class="title">{{ t("status.title.availableModpacks") }}</p>
        <p class="data">{{ result.availableModpacks }}</p>
      </MCFrame>
      <MCFrame class="status-item">
        <p class="title">{{ t("status.title.notAvailableModpacks") }}</p>
        <p class="data">{{ result.notAvailableModpacks }}</p>
      </MCFrame>
      <MCFrame class="status-item">
        <p class="title">{{ t("status.title.notEmptyModpacks") }}</p>
        <p class="data">{{ result.notEmptyModpacks }}</p>
      </MCFrame>
    </div>
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

  .status-wrapper {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4;
    @apply gap-2;

    .status-item {
      &:deep(.mcframe__main) {
        @apply py-3 md:py-5 px-2;
        @apply flex flex-col gap-y-3 md:gap-y-5 justify-between;
      }

      .title {
        @apply text-xl md:text-2xl text-center;
      }

      .data {
        @apply text-lg md:text-xl text-center;
      }
    }
  }
</style>

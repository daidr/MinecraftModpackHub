<script setup>
  import { useI18n } from "vue-i18n";
  import LangSwitch from "./LangSwitch.vue";
  import MCFrame from "./MCFrame.vue";
  import { Icon } from "@iconify/vue";

  const { t } = useI18n();
</script>

<template>
  <div class="header">
    <MCFrame class="main">
      <div class="left">
        <Icon icon="pixelarticons:briefcase-search" />{{ t("title.main") }}
      </div>
      <div class="right" id="header-slot"></div>
    </MCFrame>
    <MCFrame class="lang-switch">
      <LangSwitch />
    </MCFrame>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    @apply h-40px md:h-50px text-base md:text-lg;
    @apply select-none;
    @apply sticky top-3 md:top-5 z-20;
    @apply flex gap-x-2;
    @apply flex-shrink-0;

    &::before {
      content: "";
      @apply absolute -top-3 md:-top-5 left-0 right-0 bottom-0;
      background-image: linear-gradient(
        to bottom,
        #ebebeb,
        #ebebeb 30%,
        transparent
      );
    }

    .main {
      @apply flex-grow;

      &:deep(.mcframe__main) {
        @apply flex justify-between items-center;
        @apply px-2 sm:px-5 md:px-10;
      }

      .left {
        @apply flex justify-center items-center gap-x-1;
      }
    }

    .lang-switch {
      &:deep(.mcframe__main) {
        @apply flex justify-between items-center;
        @apply px-0 md:px-2;
        @apply text-sm md:text-base;
      }
    }
  }
</style>

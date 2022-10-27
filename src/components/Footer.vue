<script setup>
  import { useI18n } from "vue-i18n";
  import { Icon } from "@iconify/vue";

  const { t } = useI18n();
</script>

<template>
  <div class="footer">
    <div class="left">
      <a href="https://focess.top/" target="_blank">
        <Icon icon="pixelarticons:external-link" />
        MidCoard's Home
      </a>
    </div>
    <div class="right">
      <span>
        Powered by&nbsp;
        <a href="https://api.focess.top/" target="_blank">
          <Icon icon="pixelarticons:external-link" />
          FocessAPI
        </a>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .footer {
    @apply flex justify-between;
    @apply text-xs sm:text-sm md:text-base;
    @apply mb-3 sm:mb-5 md:mb-8;

    .left span,
    .right span {
      @apply flex items-center;
    }

    a {
      @apply inline-flex items-center gap-x-1;
      @apply text-[#3b904e];
      @apply underline underline-dashed underline-opacity-0 underline-transparent;

      &:hover {
        @apply underline-current;
      }
    }
  }
</style>

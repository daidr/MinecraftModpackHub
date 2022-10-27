<script setup>
  import { computed, watch } from "vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();

  const props = defineProps({
    title: {
      type: String,
      default: "title.unknown",
    },
  });

  const currentTitle = computed(() => {
    return `${t(props.title)} | ${t("title.main")}`;
  });

  watch(
    () => currentTitle.value,
    (newVal) => {
      document.title = newVal;
    }
  );
</script>

<template></template>

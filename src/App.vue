<script setup>
  import { usePageStore } from "@/store/page";
  import GlobalLoading from "@/components/GlobalLoading.vue";
  import MessageContainer from "@/components/Message/MessageContainer.vue";
  import MCFrame from "@/components/MCFrame.vue";
  import { useI18n } from "vue-i18n";
  import Title from "@/components/utils/Title.vue";
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";

  const pageStore = usePageStore();

  const { t } = useI18n();
</script>

<template>
  <div class="main-wrapper">
    <Title :title="$route.meta.pageTitle" />
    <Header></Header>
    <template v-if="true">
      <router-view v-slot="{ Component }">
        <div class="main" :class="{ disabled: pageStore.isPageLoading }">
          <component :is="Component" />
        </div>
      </router-view>
    </template>
    <Footer></Footer>
  </div>
  <GlobalLoading :is-loading="pageStore.isPageLoading" />
  <MessageContainer />
</template>

<style scoped lang="scss">
  .toolbar {
    @apply select-none;
    @apply fixed top-0 right-0 mt-2 mr-2 flex gap-x-2;
    .lang-switch {
      select {
        @apply w-full h-full;
      }
    }
  }

  .main-wrapper {
    @apply max-w-1300px w-full h-100vh;
    @apply px-3 md:px-5;
    @apply flex flex-col;

    .main {
      @apply transition mt-5 md:mt-7 flex-grow;
      @apply flex flex-col gap-y-2;

      &.disabled {
        @apply pointer-events-none opacity-0;
      }
    }
  }
</style>

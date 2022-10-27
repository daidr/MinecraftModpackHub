<script setup>
import LoadingIcon from './LoadingIcon.vue';
import MCFrame from './MCFrame.vue';
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <teleport to="#teleports">
    <transition name="fade">
      <MCFrame v-if="isLoading" class="loading-container">
        <LoadingIcon />
      </MCFrame>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.loading-container {
  @apply w-24 h-24 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;

  &:deep(.mcframe__main) {
    @apply flex justify-center items-center;
    @apply text-4xl;
    @apply text-gray-700;
  }
}
</style>

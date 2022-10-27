<template>
  <div class="mcframe">
    <div class="mcframe__tl mcframe__border"></div>
    <div class="mcframe__t mcframe__border"></div>
    <div class="mcframe__tr mcframe__border"></div>
    <div class="mcframe__l mcframe__border"></div>
    <div class="mcframe__r mcframe__border"></div>
    <div class="mcframe__bl mcframe__border"></div>
    <div class="mcframe__b mcframe__border"></div>
    <div class="mcframe__br mcframe__border"></div>
    <div class="mcframe__main">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .mcframe {
    @apply relative p-8px;

    .mcframe__border {
      @apply absolute;
    }

    .mcframe__tl {
      background-image: url(@/assets/images/mcframe/mcframe_tl.png);
      @apply top-0 left-0 w-8px h-8px;
    }

    .mcframe__t {
      background-image: url(@/assets/images/mcframe/mcframe_t.png);
      @apply top-0 left-8px right-8px h-8px;
    }

    .mcframe__tr {
      background-image: url(@/assets/images/mcframe/mcframe_tr.png);
      @apply top-0 right-0 w-8px h-8px;
    }

    .mcframe__l {
      background-image: url(@/assets/images/mcframe/mcframe_l.png);
      @apply top-8px left-0 bottom-8px w-8px;
    }

    .mcframe__r {
      background-image: url(@/assets/images/mcframe/mcframe_r.png);
      @apply top-8px right-0 bottom-8px w-8px;
    }

    .mcframe__bl {
      background-image: url(@/assets/images/mcframe/mcframe_bl.png);
      @apply bottom-0 left-0 w-8px h-8px;
    }

    .mcframe__b {
      background-image: url(@/assets/images/mcframe/mcframe_b.png);
      @apply bottom-0 left-8px right-8px h-8px;
    }

    .mcframe__br {
      background-image: url(@/assets/images/mcframe/mcframe_br.png);
      @apply bottom-0 right-0 w-8px h-8px;
    }

    .mcframe__main {
      @apply bg-[#c4c4c4] h-full;
    }
  }
</style>

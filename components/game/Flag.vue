<template>
  <div class="game-flag">
    <UISpinner v-if="loading" />
    <img
      :src="image"
      alt="Country flag"
      :class="[loading ? 'loading' : '']"
      @load="loading = false"
    >
  </div>
</template>

<script>
export default {
  props: {
    image: String
  },
  
  data() {
    return {
      loading: true
    };
  },
  watch: {
    image() {
      this.loading = true;
    }
  }
};
</script>

<style lang="scss">
.game-flag {
  display: flex;
  justify-content: center;
  align-items: center;

  &,
  & > img {
    height: 20vh;

    @include breakpoint(medium) {
      height: 30vh;
    }
  }

  img {
    box-shadow: 0 4px 8px #0003, 0 6px 20px #00000030;

    &.loading {
      display: none;
    }
  }
}
</style>

<template>
  <div
    v-if="open"
    class="ui-modal"
  >
    <div class="ui-modal__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.ui-modal {
  z-index: 9002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 75%);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    background-color: #fff;
    padding: 1rem 2rem;
    border-radius: 1rem;
    max-width: 80vw;
    max-height: 80vh;
    overflow: auto;
  }

  @media (prefers-color-scheme: dark) {
    &__content {
      background-color: var(--dark-mode-light);
    }
  }
}
</style>

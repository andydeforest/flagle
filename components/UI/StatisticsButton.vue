<template>
  <span>
    <button
      class="ui-statistics-button"
      @click="modalOpen = true"
    >
      <span class="ui-statistics-button__desktop">
        Your Statistics
      </span>
      <span class="ui-statistics-button__mobile">
        <BaseIcon icon="fa-solid fa-chart-column" />
      </span>
    </button>
    <Teleport to="body">
      <UIModal :open="modalOpen">
        <UIModalStatisticsContent @close="closeModal" />
      </UIModal>
    </Teleport>
  </span>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false
    };
  },
  methods: {
    closeModal() {
      this.modalOpen = false;
    }
  }
};
</script>

<style lang="scss">
.ui-statistics-button {
  &__desktop {
    display: none;
  }

  &__mobile {
    display: flex;
  }

  @include breakpoint(medium) {
    &__desktop {
      display: flex;
    }

    &__mobile {
      display: none;
    }
  }
}
</style>

<template>
  <div class="ui-unit-toggle">
    <div
      class="ui-unit-toggle__option"
      :class="[gameStore.options.useMetric ? 'active' : '']"
    >
      <button
        title="Kilometers"
        @click="updateUseMetric(true)"
      >
        KM
      </button>
    </div>
    <div
      class="ui-unit-toggle__option"
      :class="[!gameStore.options.useMetric ? 'active' : '']"
    >
      <button
        title="Miles"
        @click="updateUseMetric(false)"
      >
        MI
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameStore: gameStore()
    };
  },
  methods: {
    updateUseMetric(value) {
      this.gameStore.options.useMetric = value;
    }
  }
};
</script>

<style lang="scss">
.ui-unit-toggle {
  max-height: 100%;
  max-width: 100%;
  border: 3px solid #fff;
  color: #fff;
  display: flex;
  flex-direction: column;

  @include breakpoint(medium) {
    flex-direction: row;
  }

  > div {
    display: flex;
    padding: 0.5rem;
    flex: 1;

    @include breakpoint(medium) {
      padding: 0 0.5rem;
    }
  }

  &__option {
    align-self: center;
    justify-content: center;
    width: 100%;

    &.active {
      background-color: #fff;
      font-weight: 700;
      button {
        color: var(--flagle-blue);
        text-decoration: underline !important;
      }
    }
  }
}
</style>

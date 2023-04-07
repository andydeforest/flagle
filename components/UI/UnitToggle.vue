<template>
  <div class="ui-unit-toggle">
    <div class="ui-unit-toggle__option" :class="[gameStore.options.useMetric ? 'active' : '']">
      <button @click="updateUseMetric(true)">
        KM
      </button>
    </div>
    <div class="ui-unit-toggle__option" :class="[!gameStore.options.useMetric ? 'active' : '']">
      <button @click="updateUseMetric(false)">
        MI
      </button>
    </div>
  </div>
</template>

<script>
import { gameStore } from '@/stores/game';

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
  border: 1px solid #fff;
  color: #fff;
  display: flex;
  flex-direction: column;

  @include breakpoint(medium) {
    flex-direction: row;
  }

  > div {
    padding: 0.5rem;

    @include breakpoint(medium) {
      padding: 0 0.5rem;
    }
  }

  &__option {
    &.active {
      background-color: #fff;
      color: var(--flagle-blue);
      font-weight: 700;

      button {
        text-decoration: underline !important;
      }
    }
  }
}
</style>

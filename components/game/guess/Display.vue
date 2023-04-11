<template>
  <div
    class="game-guess"
    :class="[result && result.success ? 'success' : '']"
  >
    <div class="game-guess__country">
      {{ result ? result.guess : '' }}
    </div>
    <div class="game-guess__distance">
      {{ distance }}
    </div>
    <div v-html="bearingIcon" />
    <div>
      {{ percent }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: Object
  },
  data() {
    return {
      gameStore: gameStore()
    };
  },
  computed: {
    distance() {
      if (this.result) {
        if (this.gameStore.options.useMetric) {
          return parseInt((this.result.distance).toFixed(0)).toLocaleString() + ' km';
        } else {
          return parseInt((this.result.distance * 0.621371).toFixed(0)).toLocaleString() + ' mi';
        }
      }
      return '';
    },
    bearingIcon() {
      if (this.result) {
        if (this.result.success) {
          return '&#127881';
        }
        if (this.result.bearing <= 30) {
          return '&#x02191';
        } else if (this.result.bearing > 30 && this.result.bearing <= 75) {
          return '&#x02197';
        } else if (this.result.bearing > 75 && this.result.bearing <= 120) {
          return '&#x02192;';
        } else if (this.result.bearing > 120 && this.result.bearing <= 165) {
          return '&#x02198';
        } else if (this.result.bearing > 165 && this.result.bearing <= 210) {
          return '&#x02193';
        } else if (this.result.bearing > 210 && this.result.bearing <= 255) {
          return '&#x02199';
        } else if (this.result.bearing > 255 && this.result.bearing <= 300) {
          return '&#x02190';
        } else {
          return '&#x02196';
        }
      }
      return '';
    },
    percent() {
      if (this.result) {
        const percent = this.result.percent * 100;
        if (percent >= 100) {
          return '100%';
        } else if (percent <= 0) {
          return '0%';
        }
        return `${percent.toFixed(0)}%`;
      }
      return '';
    }
  }
};
</script>

<style lang="scss">
.game-guess {
  display: flex;
  flex-direction: row;
  gap: var(--base-small-gap);
  height: 3rem;
  gap: var(--guess-gap);

  &.success {
    > div {
      background-color: var(--flagle-success);
      color: #fff;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background-color: #eee;
    padding: 0.25rem 0.5rem;
    border: 0.25rem solid var(--border-color);
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    @include up-till-breakpoint(medium) {
      font-size: 1.2rem;
    }
  }

  &__country,
  &__distance {
    @include up-till-breakpoint(medium) {
      justify-content: left !important;
    }
  }
}
</style>

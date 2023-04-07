<template>
  <div class="game-guess" :class="[result && result.success ? 'success' : '']">
    <div>
      <input type="text" :value="result ? result.guess : ''" readonly>
    </div>
    <div>
      <input type="text" :value="distance" readonly>
    </div>
    <div>
      <input type="text" readonly>
      <span class="game-guess__emoji-overlay" v-html="bearingIcon" />
    </div>
    <div>
      <input type="text" :value="percent" readonly>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: Object
  },
  computed: {
    distance() {
      if (this.result) {
        return parseInt(this.result.distance.toFixed(0)).toLocaleString() + ' km';
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

  &.success {
    input {
      background-color: var(--flagle-success);
      color: #fff;
    }
  }

  > div {
    flex: 1;
    position: relative;

    input {
      width: 100%;
      background-color: #eee;
      padding: 0.25rem 0.5rem;
      border: 0.25rem solid var(--border-color);
      font-weight: 600;
      text-align: center;

      &:focus {
        outline: none;
      }
    }
  }

  &__emoji-overlay {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
    }
}
</style>

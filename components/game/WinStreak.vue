<template>
  <div
    v-if="gameStore.statistics.winStreak > 0"
    class="game-win-streak"
  >
    <small>Streak:</small>
    <h3>{{ gameStore.statistics.winStreak }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameStore: gameStore()
    };
  }
};
</script>

<style lang="scss">
.game-win-streak {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 8px #0003, 0 6px 20px #00000030;

  @include up-till-breakpoint(medium) {
    top: calc(var(--base-header-height) / 2);
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @include breakpoint(medium) {
    top: calc(var(--base-header-height) + 2rem);
    left: 2rem;
    bottom: auto;
  }

  small {
    font-size: 1.5rem;
  }
}
</style>

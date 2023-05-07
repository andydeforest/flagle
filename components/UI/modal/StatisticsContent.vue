<template>
  <div class="game-statistics">
    <button
      class="game-statistics__close"
      @click="$emit('close')"
    >
      <BaseIcon icon="fa-solid fa-xmark" />
    </button>
    <h2>
      Your Statistics
    </h2>
    <table>
      <tbody>
        <tr>
          <th>Games Played:</th>
          <td>
            {{ gameStore.statistics.gamesPlayed }}
          </td>
        </tr>
        <tr>
          <th>Record:</th>
          <td>
            {{ gameStore.statistics.wins }} - {{ gameStore.statistics.losses }} {{ winPercent }}
          </td>
        </tr>
        <tr>
          <th>Average Guesses:</th>
          <td>
            {{ averageGuesses }}
          </td>
        </tr>
        <tr>
          <th>Longest Win Streak:</th>
          <td>
            {{ gameStore.statistics.longestWinStreak }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  data() {
    return {
      gameStore: gameStore(),
      modalOpen: false
    };
  },
  computed: {
    averageGuesses() {
      if (this.gameStore.statistics.guessAmount.length) {
        const sum = this.gameStore.statistics.guessAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return (sum / this.gameStore.statistics.guessAmount.length).toFixed(2);
      }
      return 'N/A';
    },
    winPercent() {
      if (this.gameStore.statistics.gamesPlayed) {
        return `(${((this.gameStore.statistics.wins / this.gameStore.statistics.gamesPlayed) * 100).toFixed(0)}%)`;
      }
      return '';
    }
  }
};
</script>

<style lang="scss">
.game-statistics {
  display: flex;
  flex-direction: column;

  &__close {
    align-self: flex-end;
    color: var(--flagle-blue) !important;

    svg {
      font-size: 2rem !important;
    }
  }

  h2 {
    text-align: center;
  }

  table {
    font-size: 1.5rem;
    color: var(--base-text-color);

    th {
      padding: 0.5rem 1rem;
      text-align: left;

      @include breakpoint(medium) {
        text-align: right;
      }
    }

    tr {
      margin: 10rem 0;

      &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    table,
    h2,
    svg {
      color:#fff !important;
    }
  }
}
</style>

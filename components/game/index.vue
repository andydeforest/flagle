<template>
  <div
    v-if="gameStore.country"
    class="game"
  >
    <div class="game__flag">
      <GameFlag :image="`images/flags/${gameStore.country.flag}`" />
    </div>
    <div class="game__guesses">
      <GameGuessDisplay
        v-for="(result, x) in gameStore.results"
        :key="x"
        :result="result"
      />
      <GameGuessDisplay
        v-for="remaining in 6 - gameStore.results.length"
        :key="remaining"
      />
    </div>
    <div class="game__restart">
      <button
        class="game__play-again"
        @click="resetGame"
      >
        {{ gameOver ? 'Play Again' : 'I Give Up!' }}
      </button>
    </div>
    <div
      v-if="!gameOver || !displayAnswer"
      class="game__guess-input"
    >
      <GameGuessInput
        :game-over="gameOver"
        @answer="answer"
      />
    </div>
    <div
      v-else
      class="game__answer"
    >
      <h3>
        Correct Answer: {{ gameStore.country.country }}
      </h3>
    </div>
  </div>
</template>

<script>
import Flagle from '@/utils/flagle';

export default {
  data() {
    return {
      gameStore: gameStore(),
      gameOver: false,
      displayAnswer: false
    };
  },
  mounted() {
    this.startGame();
  },
  methods: {
    answer(guess) {
      const result = Flagle.getResult(guess, this.gameStore.country);
      this.gameStore.results.push(result);

      if (result.success || this.gameStore.results.length >= 6) {
        this.gameOver = true;

        if (result.success) {
          this.gameStore.handleResult(true, this.gameStore.results.length);
        } else {
          this.gameStore.handleResult(false, this.gameStore.results.length);
          this.displayAnswer = true;
        }
      }
    },
    startGame(reloadCountry = false) {
      if (this.gameStore.country === null || reloadCountry) {
        this.gameStore.generateRandom();
      }
    },
    resetGame() {
      if (!this.gameOver) {
        // user is resetting before they finished, reset their streak
        this.gameStore.statistics.winStreak = 0;
        // record as a loss
        this.gameStore.handleResult(false, this.gameStore.results.length);
        // show the the correct answer
        this.displayAnswer = true;
        this.gameOver = true;
      } else {
        // game has already been registerd as over, so we restart it
        this.gameOver = false;
        this.displayAnswer = false;
        this.gameStore.results = [];
        this.startGame(true);
      }

    }
  }
};
</script>

<style lang="scss">
.game {
  display: flex;
  flex-direction: column;
  gap: var(--base-small-gap);

  &__guesses {
    display: flex;
    flex-direction: column;
    gap: var(--guess-gap);
  }

  &__play-again {
    background-color: var(--flagle-blue);
    color: #fff;
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
  }

  &__answer {
    text-align: center;
  }
}
</style>

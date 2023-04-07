<template>
  <div v-if="gameStore.country" class="game">
    <div class="game__flag">
      <GameFlag :image="`images/flags/${gameStore.country.flag}`" />
    </div>
    <div class="game__guesses">
      <GameGuessDisplay v-for="(result, x) in results" :key="x" :result="result" />
      <GameGuessDisplay v-for="remaining in 6 - results.length" :key="remaining" />
    </div>
    <div class="game__restart">
      <button class="game__play-again" @click="resetGame">
        {{ gameOver ? 'Play Again' : 'Start New Game' }}
      </button>
    </div>
    <div v-if="!gameOver || !displayAnswer" class="game__guess-input">
      <GameGuessInput :countries="countries" :game-over="gameOver" @answer="answer" />
    </div>
    <div v-else class="game__answer">
      <h3>
        Correct Answer: {{ gameStore.country.country }}
      </h3>
    </div>
  </div>
</template>

<script>
import Flagle from '@/utils/flagle';
import { gameStore } from '@/stores/game';

export default {
  data() {
    return {
      gameStore: gameStore(),
      countries: [],
      results: [],
      gameOver: false,
      displayAnswer: false
    };
  },
  mounted() {
    this.startGame(false);
  },
  methods: {
    answer(guess) {
      const result = Flagle.getResult(guess, this.gameStore.country);
      this.results.push(result);

      if (result.success || this.results.length >= 6) {
        this.gameOver = true;

        if (result.success) {
          this.gameStore.winStreak++;
        } else {
          this.gameStore.winStreak = 0;
          this.displayAnswer = true;
        }
      }
    },
    startGame(reload = true) {
      if (this.gameStore.country === null || reload) {
        this.gameStore.country = Flagle.random();
      }
      this.countries = Flagle.countries();
    },
    resetGame() {
      this.gameOver = false;
      this.displayAnswer = false;
      this.results = [];
      this.startGame();
    }
  }
};
</script>

<style lang="scss">
.game {
  display: flex;
  flex-direction: column;
  gap: var(--base-gap);

  &__guesses {
    display: flex;
    flex-direction: column;
    gap: var(--base-small-gap);
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

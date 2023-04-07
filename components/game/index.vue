<template>
  <div v-if="country" class="game">
    <div class="game__flag">
      <img :src="`images/flags/${country.flag}`">
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
    <div class="game__guess-input">
      <GameGuessInput :countries="countries" :game-over="gameOver" @answer="answer" />
    </div>
  </div>
</template>

<script>
import Flagle from '@/utils/flagle';

export default {
  data() {
    return {
      country: null,
      countries: [],
      results: [],
      gameOver: false
    };
  },
  mounted() {
    this.startGame();
  },
  methods: {
    answer(guess) {
      const result = Flagle.getResult(guess, this.country);
      this.results.push(result);

      if (result.success || this.results.length >= 6) {
        this.gameOver = true;

        if (result.success) {
          // handle winning here
        } else {
          // handle losing here
        }
      }
    },
    startGame() {
      this.country = Flagle.random();
      this.countries = Flagle.countries();
    },
    resetGame() {
      this.gameOver = false;
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

  &__flag {
    align-self: center;

    img {
      max-height: 30vh;
      max-width: 90vw;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }

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
}
</style>

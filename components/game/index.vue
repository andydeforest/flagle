<template>
  <div v-if="gameStore.country" class="game">
    <div class="game__flag">
      <GameFlag :image="`images/flags/${gameStore.country.flag}`" />
    </div>
    <div class="game__guesses">
      <GameGuessDisplay v-for="(result, x) in gameStore.results" :key="x" :result="result" />
      <GameGuessDisplay v-for="remaining in 6 - gameStore.results.length" :key="remaining" />
    </div>
    <div class="game__restart">
      <button class="game__play-again" @click="resetGame">
        {{ gameOver ? 'Play Again' : 'Start New Game' }}
      </button>
    </div>
    <div v-if="!gameOver || !displayAnswer" class="game__guess-input">
      <GameGuessInput :game-over="gameOver" @answer="answer" />
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
          this.gameStore.winStreak++;
        } else {
          this.gameStore.winStreak = 0;
          this.displayAnswer = true;
        }
      }
    },
    startGame(reloadCountry = false) {
      if (this.gameStore.country === null || reloadCountry) {
        this.gameStore.country = Flagle.random();
      }
    },
    resetGame() {
      if (!this.gameOver) {
        // user is resetting before they finished, reset their streak
        this.gameStore.winStreak = 0;
      }
      this.gameOver = false;
      this.displayAnswer = false;
      this.gameStore.results = [];
      this.startGame(true);
    }
  }
};
</script>

<style lang="scss">
.game {
  display: flex;
  flex-direction: column;
  gap: var(--base-small-gap);

  @include breakpoint(medium) {
    gap: var(--base-gap);
  }

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

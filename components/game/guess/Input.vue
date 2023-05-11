<template>
  <div class="game-guess-input">
    <div v-if="!gameOver">
      <input
        ref="guess"
        v-model="value"
        type="text"
        :class="[showingResults ? 'showing-results' : '']"
        placeholder="Type a location name here..."
        autofocus
        @input="search"
      >
      <div
        v-if="showingResults"
        class="game-guess-input__typeahead"
      >
        <button
          v-for="(result, x) in results"
          :key="x"
          :class="[selectedIndex === x ? 'selected' : '']"
          @click="select(result.item)"
        >
          {{ result.item.name }}
        </button>
        <button
          v-if="!results.length"
          class="no-results"
        >
          No results found! Try again...
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js';

export default {
  props: {
    gameOver: Boolean,
    gameMode: String
  },
  emits: ['answer'],
  data() {
    return {
      gameStore: gameStore(),
      value: '',
      fuse: null,
      results: [],
      selectedIndex: null
    };
  },
  computed: {
    showingResults() {
      return this.value.length > 1;
    }
  },
  mounted() {
    this.fuse = new Fuse(this.gameStore[this.gameMode], { threshold: 0.2, minMatchCharLength: 2, ignoreLocation: true, keys: ['name'] });
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  updated() {
    if (this.$refs.guess) {
      this.$refs.guess.focus();
    }
  },
  methods: {
    search() {
      this.results = this.fuse.search(this.value);
      if (this.results.length) {
        this.selectedIndex = 0;
      }
    },
    select(result) {
      this.value = '';
      this.results = [];
      this.$emit('answer', result);
    },
    handleKeyDown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.selectedIndex === null) {
          this.selectedIndex = 0;
        } else if (this.selectedIndex < this.results.length - 1) {
          this.selectedIndex++;
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
        }
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        if (this.results[this.selectedIndex]) {
          this.select(this.results[this.selectedIndex].item);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.game-guess-input {
  display: flex;
  flex-direction: column;
  flex: 1;

  input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid var(--flagle-blue);
    font-weight: 600;

    &.showing-results {
      border-bottom: 1px solid #ccc;
    }

    &:focus {
      outline: none;
    }

    @media (prefers-color-scheme: dark) {
      background-color: var(--dark-mode-light);
      color: white;
    }
  }

  &__typeahead {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid var(--flagle-blue);
    border-top: none;
    max-height: 15vh;
    overflow-y: scroll;

    button {
      display: flex;
      width: 100%;
      padding: 0.25rem 0.5rem;

      &:hover,
      &.selected {
        background-color: #ccc;
      }

      &.no-results {
        cursor: default;
      }
    }

    @media (prefers-color-scheme: dark) {
      border-color: var(--dark-mode-light);
      button {
        background-color: var(--dark-mode-secondary-bg);
        color: #fff;

        &:hover,
        &.selected {
          background-color: var(--dark-mode-light);
        }
      }
    }
  }
}
</style>

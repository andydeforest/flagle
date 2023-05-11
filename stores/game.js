import { defineStore, acceptHMRUpdate } from 'pinia';
import Flagle from '@/utils/flagle';

export const gameStore = defineStore('game', {
  state: () => {
    return {
      options: {
        useMetric: true
      },
      statistics: {
        longestWinStreak: 0,
        winStreak: 0,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        guessAmount: []
      },
      gameMode: 'countries',
      states: Flagle.states(),
      countries: Flagle.countries(),
      selected: null,
      results: [],
      used: []
    };
  },
  actions: {
    generateRandom(mode) {
      // if no more countries are available, re-hydrate the list
      if (this.used.length === this[mode].length) {
        this.used = [];
      }
      // we store a list of used countries, and avoid picking those so duplicates are not shown
      const avail = this[mode].filter(place => !this.used.includes(place));
      const random = avail[Math.floor(Math.random() * avail.length)];
      this.selected = random;
      this.used.push(random);
    },
    handleResult(won, guesses) {
      this.statistics.gamesPlayed++;
      if (guesses) {
        this.statistics.guessAmount.push(guesses);
      }
      if (won) {
        this.statistics.winStreak++;
        this.statistics.wins++;
        if (this.statistics.winStreak > this.statistics.longestWinStreak) {
          this.statistics.longestWinStreak = this.statistics.winStreak;
        }
      } else {
        this.statistics.winStreak = 0;
        this.statistics.losses++;
      }
    }
  },
  persist: true
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(gameStore, import.meta.hot));
}

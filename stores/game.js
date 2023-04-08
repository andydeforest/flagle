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
      country: null,
      countries: Flagle.countries(),
      results: [],
      used: []
    };
  },
  actions: {
    generateRandom() {
      // if no more countries are available, re-hydrate the list
      if (this.used.length === this.countries.length) {
        this.used = [];
      }
      // we store a list of used countries, and avoid picking those so duplicates are not shown
      const availCountries = this.countries.filter(country => !this.used.includes(country));
      this.country = availCountries[Math.floor(Math.random() * availCountries.length)];
      this.used.push(this.country);
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

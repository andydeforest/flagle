import { defineStore, acceptHMRUpdate } from 'pinia';
import Flagle from '@/utils/flagle';

export const gameStore = defineStore('game', {
  state: () => {
    return {
      options: {
        useMetric: true
      },
      winStreak: 0,
      country: null,
      countries: Flagle.countries(),
      results: []
    };
  },
  persist: true
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(gameStore, import.meta.hot));
}

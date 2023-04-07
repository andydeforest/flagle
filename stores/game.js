import { defineStore, acceptHMRUpdate } from 'pinia';

export const gameStore = defineStore('game', {
  state: () => {
    return {
      options: {
        useMetric: true
      },
      winStreak: 0,
      country: null
    };
  },
  persist: true
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(gameStore, import.meta.hot));
}

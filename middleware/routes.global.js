export default defineNuxtRouteMiddleware((to, from) => {
  if ((to.name === 'states' || to.name === 'index')) {
    const store = gameStore();
    const gameMode = to.name === 'index' ? 'countries' : 'states';

    if (store.gameMode !== gameMode) {
      store.results = [];
      store.generateRandom(gameMode);
    }
    store.gameMode = gameMode;
  }
});
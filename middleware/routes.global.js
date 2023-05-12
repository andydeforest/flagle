export default defineNuxtRouteMiddleware((to) => {
  if ((to.name === 'states' || to.name === 'index')) {
    const store = gameStore();
    const gameMode = to.name === 'index' ? 'countries' : 'states';

    if (store.gameMode !== gameMode) {
      store.results = [];
      store.generateRandom(gameMode);
    }
    store.gameMode = gameMode;
  }
  // removes trailing slashes that were breaking image paths
  if (to.path !== '/' && to.path.endsWith('/')) {
    const { path, query, hash } = to;
    const nextPath = path.replace(/\/+$/, '') || '/';
    const nextRoute = { path: nextPath, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
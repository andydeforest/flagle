import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export const store = createStore({
	modules,
    plugins: [vuexLocal.plugin]
});

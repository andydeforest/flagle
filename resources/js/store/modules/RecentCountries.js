const state = {
    countries: []
};

const mutations = {
    ADD_COUNTRY(state, payload) {
        state.countries.push(payload);
    },
    RESET_COUNTRIES(state) {
        state.victories = [];
    }
};

const actions = {
    addCountry(commit, payload) {
        this.commit('ADD_COUNTRY', payload);
    },
    resetCountries(commit) {
        this.commit('RESET_COUNTRIES');
    }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};

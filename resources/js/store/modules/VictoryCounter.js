const state = {
    victories: 0
};

const mutations = {
    INCREMENT_VICTORIES(state) {
        state.victories++;
    },
    RESET_VICTORIES(state) {
        state.victories = 0;
    }
};

const actions = {
    incrementVictories(commit) {
        this.commit('INCREMENT_VICTORIES');
    },
    resetVictories(commit) {
        this.commit('RESET_VICTORIES');
    }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};

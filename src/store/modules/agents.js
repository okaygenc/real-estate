import api from '../../api';


const state = {
    agents: []
};

const getters = {
    allAgents: state => state.agents
}

const actions = {
    async fetchAgents({ commit }) {
        const response = await api.fetchAgents();
        commit('setAgents', response.data);
    }
};

const mutations = {
    setAgents:(state, agents) => {
        state.agents = agents;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}
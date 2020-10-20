import api from '../../api';

const state = {
    listOfRecords: []
};

const getters = {
    allRecords:(state) => {
        return state.listOfRecords
    }
};

const actions = {
    async fetchRecords({ commit }) {
        const response = await api.fetchRecords();
        commit('setRecords', response.data.records);
        console.log(response.data.records)
    }
}

const mutations = {
    setRecords:(state, records) => {
        state.listOfRecords = records;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}

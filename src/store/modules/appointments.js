import api from '../../api';

const state = {
    listOfAppointments: []
};

const getters = {
    allAppointments:(state) => {
        return state.listOfAppointments
    }
};

const actions = {
    async fetchAppointments({ commit }) {
        const response = await api.fetchAppointments();
        commit('setAppointments', response.data.records);
        console.log(response.data.records)
    }
}

const mutations = {
    setAppointments:(state, records) => {
        state.listOfAppointments = records;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}

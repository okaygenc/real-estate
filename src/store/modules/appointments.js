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
    },

    /* eslint-disable */
    async createAppointment({ commit }, data) {
        console.log('ilk yer');
        console.log(data)

        const response = await api.createContact(data);
        console.log(response);
        const appointmentResponse = await api.createAppointment(data, response);
        console.log(appointmentResponse)
    }
    /* eslint-enable */ 
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

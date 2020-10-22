import api from '../../api';
import { router } from '../../main';

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
    },

    async createAppointment(data) {
        const response = await api.createContact(data);
        const appointmentResponse = await api.createAppointment(data, response);
        // programmatic navigation
        router.push('/');
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

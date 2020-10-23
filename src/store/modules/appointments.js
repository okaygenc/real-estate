import api from '../../api';
import { router } from '../../main';

const state = {
    listOfAppointments: [],
    appointmentStatus: ''
};

const getters = {
    allAppointments:(state) => {
        return state.listOfAppointments
    },
    getStatus:(state) => {
        return state.appointmentStatus;
    }
};

const actions = {
    async fetchAppointments({ commit }) {
        const response = await api.fetchAppointments();
        commit('setAppointments', response.data.records);
    },
    /* eslint-disable */
    async createAppointment({ commit }, data) {
        commit('setStatus', "pending");
        const response = await api.createContact(data);
        await api.createAppointment(data, response);
        commit('setStatus', "success");
        // programmatic navigation
        router.push('/appointments');
    },
    async editAppointment({ commit }, data) {
        
        commit('setStatus', "pending");
        await api.editAppointment(data);
        commit('setStatus', "success");
        // programmatic navigation
        router.push('/appointments');
    }
    /* eslint-enable */ 
}

const mutations = {
    setAppointments:(state, records) => {
        state.listOfAppointments = records;
    },
    setStatus:(state, status) => {
        state.appointmentStatus = status;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}

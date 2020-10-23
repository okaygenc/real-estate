import api from '../../api';
import { router } from '../../main';

const state = {
    listOfAppointments: [],
    appointmentStatus: '',
    sortData: null,
    sortType: null
};

const getters = {
    getStatus:(state) => {
        return state.appointmentStatus;
    },
    allAppointments: (state) => {
        switch (state.sortType) {
            case "sortAgents":
                return state.listOfAppointments.filter(function(item) {
                    return item.fields.agent_id[0] == state.sortData
                });
            case "sortDate":
                return state.listOfAppointments.sort((a, b) => {
                    if(state.sortData == 'oldToNew') {
                        return  new Date(a.fields.appointment_date) - new Date(b.fields.appointment_date);
                    } else {
                        return  new Date(b.fields.appointment_date) - new Date(a.fields.appointment_date);
                    }
                });
            default:
                return state.listOfAppointments;
        }
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
    },
    filterAppointment({ commit }, data) {
        commit('setSortName', data);
    }
    /* eslint-enable */ 
}

const mutations = {
    setAppointments:(state, records) => {
        state.listOfAppointments = records;
    },
    setStatus:(state, status) => {
        state.appointmentStatus = status;
    },
    setSortName:(state, data) => {
        state.sortData = data.sortData;
        state.sortType = data.sortType;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}

import api from '../../api';
import { router } from '../../main';

const SORTERS = {
    "oldestFirst": (a, b) => new Date(a.fields.appointment_date) - new Date(b.fields.appointment_date),
    "newestFirst": (a, b) => new Date(b.fields.appointment_date) - new Date(a.fields.appointment_date),
}

const state = {
    listOfAppointments: null,
    appointmentStatus: '',
    filter: {
        status: "",
        agent: ""
    },
    sorter: null
};

const getters = {
    getStatus: (state) => state.appointmentStatus,
    filteredAppointments: (state) => {
        // Not loaded yet
        if (!state.listOfAppointments) return null;

        // Apply agent filter
        let data = state.filter.agent === ""
            ? state.listOfAppointments 
            : state.listOfAppointments.filter(i => i.fields.agent_id[0] == state.filter.agent);

        // Apply status filter
        if (state.filter.status === "active") {
            data = data.filter(i => new Date(i.fields.appointment_date) > new Date());
        } else if (state.filter.status === "passive") {
            data = data.filter(i => new Date(i.fields.appointment_date) <= new Date());
        }
        
        // Apply sort preference
        if (state.sorter !== null) {
            data = data.sort(SORTERS[state.sorter]);
        }


        return data;
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
    setFilter: ({ commit }, data) => commit('setFilter', data),
    setSorter: ({ commit }, value) => commit('setSorter', value)
    /* eslint-enable */ 
}

const mutations = {
    setAppointments: (state, records) => state.listOfAppointments = records,
    setStatus: (state, status) => state.appointmentStatus = status,
    setFilter: (state, { type, value }) => state.filter = { ...state.filter, [type]: value },
    setSorter: (state, value) => state.sorter = value
}

export default {
    state,
    getters,
    actions,
    mutations,
}

import api from '../../api';


const state = {
    contacts: []
};

const getters = {
    allContacts: state => state.contacts
}

const actions = {
    async fetchContacts({ commit }) {
        const response = await api.fetchContacts();
        commit('setContacts', response.data);
    }
};

const mutations = {
    setContacts:(state, contacts) => {
        state.contacts = contacts;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
};
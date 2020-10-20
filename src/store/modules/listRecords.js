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
    async fetchRecords() {
        const response = await api.fetchRecords();
        console.log(response)
    }
}

const muttations = {
    setRecords:(state, records) => {
        state.listOfRecords = records;
    }
}

export default {
    state,
    getters,
    actions,
    muttations
}

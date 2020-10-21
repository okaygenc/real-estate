import Vuex from 'vuex';
import Vue from 'vue';
import Appointments from './modules/appointments';
import Agents from './modules/agents';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Appointments,
        Agents
    }
})
import Vuex from 'vuex';
import Vue from 'vue';
import ListOfRecords from './modules/listRecords';
import listAgents from './modules/listAgents';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ListOfRecords,
        listAgents
    }
})
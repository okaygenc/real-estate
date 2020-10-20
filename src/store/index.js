import Vuex from 'vuex';
import Vue from 'vue';
import ListOfRecords from './modules/listRecords';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ListOfRecords
    }
})
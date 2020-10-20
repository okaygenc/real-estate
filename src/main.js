import Vue from 'vue';
import App from './App';
import store from './store';
import VueRouter from 'vue-router';
import Home from './pages/home/Home.vue';
import Appointments from './pages/appointments/Appointments';
import CreateAppointments from './pages/createAppointment/CreateAppointment';


Vue.use(VueRouter);


export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/appointments', component: Appointments},
        {path: '/create-appointment', component: CreateAppointments}
    ]
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
import Vue from 'vue';
import App from './App';
import store from './store';
import VueRouter from 'vue-router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
import Home from './pages/home/Home.vue';
import Appointments from './pages/appointments/Appointments';
import CreateAppointments from './pages/createAppointment/CreateAppointment';


Vue.use(VueRouter);


export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/appointments', component: Appointments},
        {path: '/create-appointment', component: CreateAppointments},
        {path: '/edit-appointment', name:"edit-appointment", component: CreateAppointments,  props: true}
    ]
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
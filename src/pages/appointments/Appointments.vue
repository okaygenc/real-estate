<template>
    <div>
        <div v-if="allAppointments.length">
            <FilterData :filterAgent="filterAgent" :filterDate="filterDate" :allAgents="allAgents"  @onInput="onInput" @openFilter="openFilter" />
            <div class="table-responsive">
                <table class="table">
                    <caption>List of appointments</caption>
                    <thead>
                        <tr>
                            <th scope="col">Agent Id</th>
                            <th scope="col">Agent Name</th>
                            <th scope="col">Agent Surname</th>
                            <th scope="col">Appointment Date</th>
                            <th scope="col">Appointment Id</th>
                            <th scope="col">Appointment Post Code</th>
                            <th scope="col">Contact Email</th>
                            <th scope="col">Contact Id</th>
                            <th scope="col">Contact Name</th>
                            <th scope="col">Contact Phone</th>
                            <th scope="col">Contact Surname</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="appointment in allAppointments" :appointment="appointment" :key="appointment.id">
                            <td>{{appointment.fields.agent_id[0]}}</td>
                            <td>{{appointment.fields.agent_name[0]}}</td>
                            <td>{{appointment.fields.agent_surname[0]}}</td>
                            <td>{{appointment.fields.appointment_date}}</td>
                            <td>{{appointment.fields.appointment_id}}</td>
                            <td>{{appointment.fields.appointment_postcode}}</td>
                            <td>{{appointment.fields.contact_email[0]}}</td>
                            <td>{{appointment.fields.contact_id[0]}}</td>
                            <td>{{appointment.fields.contact_name[0]}}</td>
                            <td>{{appointment.fields.contact_phone[0]}}</td>
                            <td>{{appointment.fields.contact_surname[0]}}</td>
                            <td><router-link :to="{ name: 'edit-appointment', params: { appointment } }" type="button" class="btn btn-primary btn-sm">Edit</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Loading v-else />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loading from '../../components/Loading';
import FilterData from '../../components/FilterData';

export default {
    name: 'appointments',
    components:{ Loading, FilterData },
    data() {
        return{
            filterAgent: false,
            filterDate: false,
            sortType: null,
            sortData: null
        }
    },
    methods: {
        ...mapActions(['fetchAppointments', 'fetchAgents', 'filterAppointment']),
        openFilter(type) {
            if(type == 'date') {
                this.filterAgent = false;
                this.filterDate = !this.filterDate;
            } else {
                this.filterAgent = !this.filterAgent;
                this.filterDate = false;
            }
            
        },
        onInput(e) {
            const { value, name } = e.target;
            this.sortType = name;
            this.sortData = value;
            this.filterAppointment({sortData: this.sortData, sortType: this.sortType});
        },
    },
    computed: mapGetters(['allAppointments', 'allAgents']),
    created() {
        this.fetchAppointments();
        this.fetchAgents();
    }
}
</script>
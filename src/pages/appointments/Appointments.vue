<template>
    <div>
        <div class="table-responsive" v-if="allAppointments.length">
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
                    </tr>
                </tbody>
            </table>
        </div>
        <h3 v-else class="d-flex justify-content-center mt-5">Loading...</h3>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'appointments',
    methods: mapActions(['fetchAppointments']),
    computed: mapGetters(['allAppointments']),
    created() {
        this.fetchAppointments();
    }
}
</script>
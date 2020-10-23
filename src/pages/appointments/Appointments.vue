<template>
    <div>
        <div v-if="filteredAppointments">
            <FilterBar
                :agents="allAgents"
                 @filter-change="setFilter"
                 @sorter-change="setSorter" 
            />
            
            <div class="table-responsive">
                <table class="table">
                    <caption>List of appointments</caption>
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
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
                        <tr v-for="appointment in filteredAppointments" :appointment="appointment" :key="appointment.id">
                            <td><AppointmentStatus :date="appointment.fields.appointment_date" /></td>
                            <td>{{ appointment.fields.agent_id[0] }}</td>
                            <td>{{ appointment.fields.agent_name[0] }}</td>
                            <td>{{ appointment.fields.agent_surname[0] }}</td>
                            <td>{{ appointment.fields.appointment_date }}</td>
                            <td>{{ appointment.fields.appointment_id }}</td>
                            <td>{{ appointment.fields.appointment_postcode }}</td>
                            <td>{{ appointment.fields.contact_email[0] }}</td>
                            <td>{{ appointment.fields.contact_id[0] }}</td>
                            <td>{{ appointment.fields.contact_name[0] }}</td>
                            <td>{{ appointment.fields.contact_phone[0] }}</td>
                            <td>{{ appointment.fields.contact_surname[0] }}</td>
                            <td>
                                <router-link 
                                    :to="{ name: 'edit-appointment', params: { appointment } }"
                                    type="button"
                                    class="btn btn-primary btn-sm"
                                >
                                    Edit
                                </router-link>
                            </td>
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
import FilterBar from '../../components/FilterBar';
import AppointmentStatus from '../../components/AppointmentStatus';

export default {
    name: 'appointments',
    components:{ Loading, FilterBar, AppointmentStatus },
    methods: mapActions(['fetchAgents', 'fetchAppointments', 'setFilter', 'setSorter']),
    computed: mapGetters(['filteredAppointments', 'allAgents']),
    created() {
        this.fetchAppointments();
        this.fetchAgents();
    }
}
</script>
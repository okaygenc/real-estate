<template>
    <div>
        <div class="table-responsive" v-if="allRecords.length">
            <table class="table">
                <caption>List of records</caption>
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
                    <tr v-for="record in allRecords" :record="record" :key="record.id">
                        <td>{{record.fields.agent_id[0]}}</td>
                        <td>{{record.fields.agent_name[0]}}</td>
                        <td>{{record.fields.agent_surname[0]}}</td>
                        <td>{{record.fields.appointment_date}}</td>
                        <td>{{record.fields.appointment_id}}</td>
                        <td>{{record.fields.appointment_postcode}}</td>
                        <td>{{record.fields.contact_email[0]}}</td>
                        <td>{{record.fields.contact_id[0]}}</td>
                        <td>{{record.fields.contact_name[0]}}</td>
                        <td>{{record.fields.contact_phone[0]}}</td>
                        <td>{{record.fields.contact_surname[0]}}</td>
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
    methods: mapActions(['fetchRecords']),
    computed: mapGetters(['allRecords']),
    created() {
        this.fetchRecords();
    }
}
</script>
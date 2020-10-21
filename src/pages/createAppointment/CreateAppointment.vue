<template>
    <div>
        <div class="row">
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleInputEmail1">Appointment Date</label>
                    <input type="text" class="form-control" placeholder="Appointment Date" @input="onInput" name="appointment_date">
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleInputEmail1">Appointment Postcode</label>
                    <input type="text" class="form-control" placeholder="Appointment Postcode" @input="onInput" name="appointment_postcode">
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Select Agent</label>
                    <select class="form-control" v-model="formData.agent_id">
                        <option v-for="agent in allAgents.records" :agent="agent" :key="agent.fields.agent_id" :value="agent.agent_id">{{agent.fields.agent_name}} {{agent.fields.agent_surname}}</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleInputEmail1">Contact Name</label>
                    <input type="text" class="form-control" placeholder="Contact Name" name="contact_name" @input="onInput">
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleInputEmail1">Contact Surname</label>
                    <input type="text" class="form-control" placeholder="Contact Surname"  name="contact_surname" @input="onInput">
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleInputEmail1">Contact Email</label>
                    <input type="email" class="form-control" placeholder="Contact Email" name="contact_email" @input="onInput">
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleInputEmail1">Contact Phone</label>
                    <input type="tel" class="form-control" placeholder="Contact Phone" name="contact_phone" @input="onInput">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12"> <button type="submit" class="btn btn-primary" @click="sendForm">Save</button></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name:'createAppointment',
    data() {
        return {
            formData: {
                appointment_date: '',
                appointment_postcode: '',
                agent_id: '',
                contact_name: '',
                contact_surname: '',
                contact_email: '',
                contact_phone: '',
            },
        }
    },
    computed: mapGetters(['allAgents']),
    methods: {
        ...mapActions(['fetchAgents', 'createAppointment']),
        onInput(e) {
            const { name, value } = e.target;
            this.$set(this.formData, name, value);

        },
        sendForm() {
            this.createAppointment(this.formData);
        }
    },
    created() {
        this.fetchAgents();
    }
}
</script>
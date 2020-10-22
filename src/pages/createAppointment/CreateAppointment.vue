<template>
    <div>
        <div class="row">
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleInputEmail1">Appointment Date</label>
                    <date-picker v-model="formData.appointment_date" type="datetime" :show-second="false"></date-picker>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Select Agent</label>
                    <select class="form-control" v-model="formData.agent_id">
                        <option v-for="agent in allAgents.records" :agent="agent" :key="agent.fields.agent_id" :value="agent.id">{{agent.fields.agent_name}} {{agent.fields.agent_surname}}</option>
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
        <Plan 
            v-if="formData.appointment_date && formData.appointment_postcode" 
            :date="formData.appointment_date"
            :postCode="formData.appointment_postcode"
        />
        <b>Appointment Postcode:</b>
        <Map @postCodeReady="postCodeReady" />
        <div class="row">
            <div class="col-lg-12"> <button type="submit" class="btn btn-primary" @click="sendForm">Save</button></div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Map from './Map';
import Plan from './Plan';

import { mapActions, mapGetters } from 'vuex';
export default {
    name:'createAppointment',
    data() {
        return {
            formData: {
                appointment_date: null,
                appointment_postcode: null,
                agent_id: null,
                contact_name: null,
                contact_surname: null,
                contact_email: null,
                contact_phone: null
            },
            deneme: "a"
        }
    },
    components: { DatePicker, Map, Plan },
    computed: mapGetters(['allAgents']),
    methods: {
        ...mapActions(['fetchAgents', 'createAppointment']),
        onInput(e) {
            const { name, value } = e.target;
            this.$set(this.formData, name, value);
        },
        sendForm() {
            const { appointment_date, appointment_postcode, agent_id, contact_name, contact_surname, contact_email, contact_phone } = this.formData;
            
            if(appointment_date == null || agent_id == null || contact_name == null || contact_surname == null || contact_email == null || contact_phone == null) {
                this.$swal({icon: 'warning', text: 'Please fill out all fields'});
            } else if(appointment_postcode == null) {
                this.$swal({icon: 'warning', text: 'Please select location from map'});
            } else {
                this.createAppointment(this.formData);
            }
        },
        postCodeReady(code) {
            this.$set(this.formData, "appointment_postcode", code);
        }
    },
    created() {
        this.fetchAgents();
    }
}
</script>
<style scoped>
    .mx-datepicker{
        width: 100%!important;
    }
</style>
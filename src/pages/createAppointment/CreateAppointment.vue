<template>
    <div>
        <Loading v-if="getStatus === 'pending'" />
        <div v-else>
        <EditAppointment v-if="formData && editForm" :allAgents="allAgents" :formData="formData" :allContacts="allContacts" @dateChange="dateChange" @onInput="onInput" />
        <div v-else>
            <div class="row">
                <div class="col-lg-12">
                    <h4>Create Appointment</h4>
                    <hr>
                </div>
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
            <Map @postCodeReady="postCodeReady"/>
            </div>
            <SendButton text="Gonder"  @sendForm="tryToSend"/>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Map from './Map';
import Plan from './Plan';
import SendButton from '../../components/SendButton';
import EditAppointment from '../../components/EditAppointment';
import Loading from '../../components/Loading';

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
            editForm: false,
            contact_id: ''
        }
    },
    components: { DatePicker, Map, Plan,  SendButton, EditAppointment, Loading},
    computed: mapGetters(['allAgents', 'allContacts', 'getStatus']),
    watch: {
        '$route.path': function(){
            this.editForm = false;
            this.formData = {
                appointment_date: null,
                appointment_postcode: null,
                agent_id: null,
                contact_name: null,
                contact_surname: null,
                contact_email: null,
                contact_phone: null,
            };
        }
    },
    methods: {
        ...mapActions(['fetchAgents', 'fetchContacts', 'createAppointment', 'editAppointment']),
        onInput(e) {
            const { name, value } = e.target;
            this.$set(this.formData, name, value);
        },
        tryToSend() {
            const { appointment_date, appointment_postcode, agent_id, contact_name, contact_surname, contact_email, contact_phone } = this.formData;

            if(appointment_date == null || agent_id == null || contact_name == null || contact_surname == null || contact_email == null || contact_phone == null) {
                this.$swal({icon: 'warning', text: 'Please fill out all fields'});
            } else if(appointment_postcode == null) {
                this.$swal({icon: 'warning', text: 'Please select location from map'});
            } else {
                this.editForm ? this.editAppointment(this.formData) : this.createAppointment(this.formData);
            }
        },
        postCodeReady(code) {
            this.$set(this.formData, "appointment_postcode", code);
        },
        dateChange(data) {
            this.$set(this.formData, "appointment_date", data);
        }
    },
    created() {
        this.fetchAgents();
        if(this.$route.params.appointment) {
            this.formData = this.$route.params.appointment.fields;
            this.$set(this.formData, "agent_id", this.formData.agent_id[0]);
            this.$set(this.formData, "contact_id", this.formData.contact_id[0]);
            this.editForm = true;
            this.fetchContacts();
        }
    },
}
</script>
<style>
    .mx-datepicker{
        width: 100%!important;
    }
</style>
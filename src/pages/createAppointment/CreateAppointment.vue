<template>
    <form @submit="submit">
        <Loading v-if="getStatus === 'pending'" />

        <div v-else>
            <EditAppointment 
                v-if="formData && editForm"
                :allAgents="allAgents"
                :formData="formData"
                :allContacts="allContacts"
                @dateChange="dateChange"
                @onInput="onInput" 
            />
        
            <div v-else>
                <div class="row">
                    <div class="col-lg-12">
                        <h4>Create Appointment</h4>
                        <hr>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label>Appointment Date</label>
                            <date-picker 
                                required
                                v-model="formData.appointment_date"
                                type="datetime"
                                :show-second="false"
                            ></date-picker>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label for="agent_id">Select Agent</label>
                            <select id="agent_id" class="form-control" v-model="formData.agent_id" required>
                                <option v-for="agent in allAgents.records" :agent="agent" :key="agent.fields.agent_id" :value="agent.id">{{agent.fields.agent_name}} {{agent.fields.agent_surname}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label for="contact_name">Contact Name</label>
                            <input type="text" class="form-control" placeholder="Contact Name" id="contact_name" name="contact_name" @input="onInput" required>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label for="contact_surname">Contact Surname</label>
                            <input type="text" class="form-control" placeholder="Contact Surname" id="contact_surname"  name="contact_surname" @input="onInput" required>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label for="contact_email">Contact Email</label>
                            <input type="email" class="form-control" placeholder="Contact Email" id="contact_email" name="contact_email" @input="onInput" required>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label for="contact_phone">Contact Phone</label>
                            <input type="tel" class="form-control" placeholder="Contact Phone" id="contact_phone" name="contact_phone" @input="onInput" required>
                        </div>
                    </div>
                </div>
                
                <b>Appointment Postcode:</b>
                <Map @postCodeReady="postCodeReady"/>

                <Plan
                    v-if="formData.appointment_date && formData.appointment_postcode"
                    :date="formData.appointment_date"
                    :postCode="formData.appointment_postcode"
                />

            </div>
            
            <SendButton :text="editForm ? 'Edit Data' : 'Save Data'" />
        </div>
    </form>
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
            contact_id: '',
            appointmentId: ''
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
        submit(e) {
            e.preventDefault();

            // Validate 3rd party fields
            if (!this.formData.appointment_date) {
                return this.$swal({ icon: 'warning', text: 'Please pick an appointment date' });
            } else if (this.formData.appointment_postcode == null) {
                return this.$swal({ icon: 'warning', text: 'Please select appointment location on map' });
            }
                
            this.editForm 
                ? this.editAppointment({formData: this.formData, id: this.appointmentId})
                : this.createAppointment(this.formData, );
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
            this.appointmentId = this.$route.params.appointment.id;
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
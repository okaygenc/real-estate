<template>
    <div class="row">
        <div class="col-lg-12">
            <h4>Edit Appointment</h4>
            <hr>
        </div>
        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleInputEmail1">Appointment Dateedir</label>
                <date-picker v-model="dateWithDefault" type="datetime" :show-second="false" ></date-picker>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleFormControlSelect1">Select Agent</label>
                <select class="form-control" name="agent_id"  @change="onInput($event)">
                        <option v-for="agent in allAgents.records" :agent="agent" :key="agent.fields.agent_id" :value="agent.id" :selected="agent.id === formData.agent_id">{{agent.fields.agent_name}} {{agent.fields.agent_surname}}</option>
                </select>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleFormControlSelect1">Contacts</label>
                <select class="form-control" name="contact_id"  @change="onInput($event)">
                        <option v-for="contact in allContacts.records" :contact="contact" :key="contact.id" :value="contact.id" :selected="contact.id === formData.contact_id">{{contact.fields.contact_name}} {{contact.fields.contact_surname}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name: 'editAppointment',
    props:[ 'allAgents', 'formData', 'allContacts'],
    data() {
        return {
            appointmentDate: null
        }
    },
    components:{DatePicker},
    computed: {
        dateWithDefault: {
            get() {
                return new Date(this.formData.appointment_date);
            },
            set(val) {
                this.appointmentDate = val;
            }
        },
    },
    watch: {
        // whenever Appointment Date changes, this function will run
        appointmentDate: function () {
        this.$emit('dateChange', this.appointmentDate);
        }
    },
    methods: {
        onInput() {
            this.$emit('onInput', event)
        }
    }
}
</script>
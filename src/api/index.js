import qs from 'qs';
import axios from 'axios';

const ROOT_URL = "https://api.airtable.com/v0/appgykZBGTF92MnHu";
const API_KEY = "keyNSO2Is7ewJV2jV";

export default {
    fetchAppointments() {
        const querystring = {
            view: "Grid view"
        }
        return axios.get(`${ROOT_URL}/Appointments?${qs.stringify(querystring)}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
    },
    fetchAgents() {
        const querystring = {
            view: "Grid view"
        }
        return axios.get(`${ROOT_URL}/Agents?${qs.stringify(querystring)}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
    },
    fetchContacts() {
        const querystring = {
            view: "Grid view"
        }
        return axios.get(`${ROOT_URL}/Contacts?${qs.stringify(querystring)}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
    },
    createContact(data) {
        const { contact_name, contact_surname, contact_email, contact_phone } = data;
        let formData = {
            "fields": {
                "contact_name": contact_name,
                "contact_surname": contact_surname,
                "contact_email": contact_email,
                "contact_phone": contact_phone,
              }
        }

        return axios.post(`${ROOT_URL}/Contacts`, formData, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
    },
    createAppointment(data, response) {
        let formData = {
            "fields": {
                "appointment_date": data.appointment_date,
                "appointment_postcode": data.appointment_postcode,
                "contact_id": [response.data.id],
                "agent_id": [
                  data.agent_id
                ],
            }
        }

        return axios.post(`${ROOT_URL}/Appointments`, formData, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
    },
    editAppointment(data) {
        let formData = {
            "fields": {
                "appointment_date": data.formData.appointment_date,
                "appointment_postcode": data.formData.appointment_postcode,
                "contact_id": [data.formData.contact_id],
                "agent_id": [
                  data.formData.agent_id
                ],
            }
        }
        return axios.patch(`${ROOT_URL}/Appointments/${data.id}`, formData, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
    }
}
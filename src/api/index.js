import qs from 'qs';
import axios from 'axios';

const ROOT_URL = "https://api.airtable.com/v0/appgykZBGTF92MnHu";
const API_KEY = "keyNSO2Is7ewJV2jV";

export default {
    fetchAppointments() {
        const querystring = {
            maxRecords: 3,
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
            maxRecords: 3,
            view: "Grid view"
        }
        return axios.get(`${ROOT_URL}/Agents?${qs.stringify(querystring)}`, {
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
    }
}
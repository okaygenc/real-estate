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
    }
}
import qs from 'qs';
import axios from 'axios';

const ROOT_URL = "https://api.airtable.com/v0/appgykZBGTF92MnHu/Appointments";
const API_KEY = "keyNSO2Is7ewJV2jV";

export default {
    fetchRecords() {
        const querystring = {
            maxRecords: 3,
            view: "Grid view"
        }
        return axios.get(`${ROOT_URL}?${qs.stringify(querystring)}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
    }
}
import axios from "axios";
import {getAuthToken} from "./authStorage";

export default function setupHttp() {
    axios.defaults.baseURL = "http://localhost:8080"
    if(getAuthToken() !== null) axios.defaults.headers['Authorization'] = `Bearer ${getAuthToken()}`
    else axios.defaults.headers['Authorization'] = null
}

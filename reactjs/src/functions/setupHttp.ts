import axios from "axios";
import {getAuthToken} from "./authStorage";

export default function setupHttp() {
    axios.defaults.headers['Authorization'] = `Bearer ${getAuthToken()}`
}

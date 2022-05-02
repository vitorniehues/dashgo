import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies()

export const singInService = axios.create({
    baseURL: 'http://localhost:3005',
    headers: {
        Authorization: 'Bearer ' + cookies['dashgo.token']
    }
})
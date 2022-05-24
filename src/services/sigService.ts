import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies()

export const sigService = axios.create({
  baseURL: 'http://localhost:3010',
  headers: {
    Authorization: 'Bearer ' + cookies['app.presidente.token']
  }
})
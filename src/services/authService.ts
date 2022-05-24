import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies()

export const authService = axios.create({
  baseURL: 'http://localhost:3005',
  headers: {
    Authorization: 'Bearer ' + cookies['app.presidente.token']
  }
})
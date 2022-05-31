import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import { responseInterceptor } from "./ResponseInterceptors";

const cookies = parseCookies()

export const sigService = axios.create({
  baseURL: 'http://localhost:3010',
  headers: {
    Authorization: 'Bearer ' + cookies['app.presidente.token']
  }
})

sigService.interceptors.response.use(res => res, error => responseInterceptor.handleRefreshToken(error))
import axios from "axios";
import { parseCookies } from "nookies";
import { responseInterceptor } from "./ResponseInterceptors";

let cookies = parseCookies()

export const authService = axios.create({
  baseURL: 'http://localhost:3005',
  headers: {
    Authorization: 'Bearer ' + cookies['app.presidente.token']
  }
})

// authService.interceptors.request.use(req => {
//   responseInterceptor.handleRefreshToken('AUTH', req)
//   return req
// },
//   err => {
//     console.error(`Error on request from AUTH on ${err.config.url}`)
//     Promise.reject(err)
//   }
// )

// authService.interceptors.response.use(res => {
//   console.log(`Received response from AUTH on ${res.config.url}`)
//   return res
// },
//   err => {
//     console.error(`Received response with ERROR from AUTH on ${err.config.url}`)
//     Promise.reject(err)
//   }
// )

authService.interceptors.response.use(res => res, error => responseInterceptor.handleRefreshToken(error))
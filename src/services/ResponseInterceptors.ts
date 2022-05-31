import axios, { AxiosError } from "axios";
import ms from "ms";
import { parseCookies, setCookie } from "nookies";
import { singOut } from "../hooks/contextHooks/useAuthContext";
import { authService } from "./authService";
import { sigService } from "./sigService";

interface IErrorResponse {
  status: number,
  data: {
    code: string,
    message: string,
  }
}
class ResposeInterceptors {

  private failedRequestsQueue = []
  private isRefreshing = false

  handleRefreshToken(error: AxiosError) {
    if (error.code !== "ERR_BAD_REQUEST") return Promise.reject(error)

    const { status, data } = error.response as IErrorResponse

    if (status === 401) {
      if (data.code === 'token.expirado') {
        //renovar token

        const cookies = parseCookies();
        const { 'app.presidente.refresh-token': refreshToken } = cookies
        const originalConfig = error.config

        if (!this.isRefreshing) {
          this.isRefreshing = true

          authService.post('/refresh-token', {
            refreshToken
          })
            .then(res => {
              const { token, refreshToken: newRefreshToken } = res.data

              setCookie(undefined, 'app.presidente.token', token, {
                expires: new Date(Date.now() + ms('1d')),
                path: '/'
              })

              setCookie(undefined, 'app.presidente.refresh-token', newRefreshToken, {
                expires: new Date(Date.now() + ms('1d')),
                path: '/'
              })

              authService.defaults.headers['Authorization'] = `Bearer ${token}`
              sigService.defaults.headers['Authorization'] = `Bearer ${token}`

              this.failedRequestsQueue.forEach(req => req.onSucess(token))
              this.failedRequestsQueue = []
            })
            .catch((err: AxiosError) => {
              //TODO verificar se refreshToken e invalido e relogar
              this.failedRequestsQueue.forEach(req => req.onFailure(err))
              this.failedRequestsQueue = []
              singOut()
            })
            .finally(() => this.isRefreshing = false)
        }

        return new Promise((resolve, reject) => {
          this.failedRequestsQueue.push({
            onSucess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(axios(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      }
      else {
        singOut()
      }
    }
    return Promise.reject(error)
  }
}
export const responseInterceptor = new ResposeInterceptors()
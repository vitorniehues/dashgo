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

// sigService.interceptors.request.use(req => {
//   responseInterceptor.handleRefreshToken('SIG', req)
//   return req
// },
//   err => Promise.reject(err)
// )


interface IResponse {
  cod_pessoa: number,
  nome: string
}

export async function consultaPessoasAutorizadas() {
  try {
    const res = await sigService.get<IResponse[]>('pessoa/autorizadas')
    return res.data.map(e => {
      return {
        id: e.cod_pessoa,
        title: e.nome
      }
    })
  } catch (error) {
    console.log("Erro ao recuperar pessoas autorizadas")
  }

}
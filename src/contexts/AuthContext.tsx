import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { setCookie, parseCookies } from "nookies";
import ms from "ms";

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  singIn(credentials: SingInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: number,
  cpf: string,
  email: string,
  role: string,
  pessoasAutorizadas: number[]
}

interface IResponse {
  userInfo: {
    id: number,
    cpf: string,
    email: string,
    role: string,
    pessoasAutorizadas: number[]
  },
  token: string,
  refreshToken: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'app.presidente.token': token } = parseCookies()

    if (token) {
      authService.get<IResponse>('/usuario').then(response => {
        setUser(response.data.userInfo)
      })
    }
  }, [])

  async function singIn({ email, password }: SingInCredentials) {
    try {
      const response = await authService.post<IResponse>('login', {
        email,
        senha: password
      })

      setUser(response.data.userInfo)

      const { token, refreshToken } = response.data

      //TODO: Set Cookies with HTTP-Only from response header

      setCookie(undefined, 'app.presidente.token', token, {
        expires: new Date(Date.now() + ms('30d')),
        path: '/'
      })

      setCookie(undefined, 'app.presidente.refresh-token', refreshToken, {
        expires: new Date(Date.now() + ms('30d')), //30 Dias
        path: '/'
      })

      authService.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }

  }
  return (
    <AuthContext.Provider value={{ singIn, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
import Router from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import ms from "ms";
import { sigService } from "../../services/sigService";

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  singIn(credentials: SingInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
  idPessoaOperacao?: number;
  setIdPessoaOperacao(id: number): void;
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

interface ILoginResponse {
  userInfo: User,
  token: string,
  refreshToken: string
}

const AuthContext = createContext({} as AuthContextData)

export function singOut() {
  destroyCookie(undefined, 'app.presidente.token')
  destroyCookie(undefined, 'app.presidente.refresh-token')

  Router.push('/')
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  //TODO atualizar usuario a cada atualizacao do refreshtoken ? talvez nao seja necessario
  //TODO exportar idPessoaOperacao para ser usado e modificado por outros componentes
  const [user, setUser] = useState<User>()
  const [idPessoaOperacao, setIdPessoaOperacao] = useState<number>()
  const isAuthenticated = !!user


  useEffect(() => {
    const { 'app.presidente.token': token } = parseCookies()

    if (token) {
      authService.get<User>('/usuario')
        .then(response => {
          const userResponse = response.data

          setUser(userResponse)
        })
    }
  }, [])

  //TODO rever esse codigo.
  useEffect(() => {
    if (!user) return
    if (user.role === 'USUARIO' && user.pessoasAutorizadas.length > 0) {
      setIdPessoaOperacao(user.pessoasAutorizadas[0])
    }
    else {
      throw new Error("Erro dados do usuário. Sem pessoa autorizada.");
    }
  }, [user])



  async function singIn({ email, password }: SingInCredentials) {

    try {
      const response = await authService.post<ILoginResponse>('login', {
        email,
        senha: password
      })

      setUser(response.data.userInfo)


      const { token, refreshToken } = response.data

      //TODO: Set Cookies with HTTP-Only from response header

      setCookie(undefined, 'app.presidente.token', token, {
        expires: new Date(Date.now() + ms('1d')),
        path: '/'
      })

      setCookie(undefined, 'app.presidente.refresh-token', refreshToken, {
        expires: new Date(Date.now() + ms('1d')), //30 Dias
        path: '/'
      })

      authService.defaults.headers['Authorization'] = `Bearer ${token}`
      sigService.defaults.headers['Authorization'] = `Bearer ${token}`


      Router.push('/dashboard')

    } catch (error) {
      console.error(error.response.data.message)
    }
  }

  return (
    <AuthContext.Provider value={{ singIn, user, isAuthenticated, idPessoaOperacao, setIdPessoaOperacao }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
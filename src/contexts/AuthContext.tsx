import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { singInService } from "../services/singInService";
import { setCookie, parseCookies } from "nookies";

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
    email: string;
    role: string[];
    pessoasAutorizadas: number[]
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user

    useEffect(() => {
        const { 'dashgo.token': token } = parseCookies()

        if (token) {
            singInService.get('/user').then(response => {
                const { email, role, pessoasAutorizadas } = response.data

                setUser({ email, role, pessoasAutorizadas })
            })
        }
    }, [])

    async function singIn({ email, password }: SingInCredentials) {
        try {
            const response = await singInService.post('login', {
                email,
                senha: password
            })

            const { role, pessoasAutorizadas } = response.data.userInfo
            const { token } = response.data

            setUser({
                email,
                role,
                pessoasAutorizadas
            })

            setCookie(undefined, 'dashgo.token', token, {
                maxAge: 60 * 60 * 24 * 30, //30 Dias
                path: '/'
            })

            singInService.defaults.headers['Authorization'] = `Bearer ${token}`

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
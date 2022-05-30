import { FullPageErrorFallback, FullPageLoading } from '@/components/lib'
import { useAsync } from '@/hooks/use-async'
import { http } from '@/http'
import { User } from '@/inter/user/user'
import React, { ReactNode, useState } from 'react'
import { useDidMount } from 'rooks'

import * as auth from '../auth-provider'

interface AuthForm {
  username: string
  password: string
}

interface ProviderValue {
  user: User | null
  login: (form: AuthForm) => Promise<void>
  register: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

const initUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const res = await http('me', { token })
    const { data } = res
    user = { ...data, token }
  }
  return user
}

const AuthContext = React.createContext<ProviderValue | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, data: user, setData: setUser, isLoading, isIdel, error } = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useDidMount(async () => {
    await run(initUser())
  })

  if (isIdel || isLoading) {
    return <FullPageLoading />
  }

  if (error) {
    return <FullPageErrorFallback error={error} />
  }
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}

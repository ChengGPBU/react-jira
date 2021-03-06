import { User } from './inter/user/user'

const apiUlr = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'
export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User): User => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUlr}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: data.username, password: data.password }),
  }).then(async (response) => {
    console.log('~~~~~login~~~~~~~~~~', response.ok)
    if (response.ok) {
      const res = await response.json()
      const { data } = res
      return handleUserResponse(data)
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: { username: string; password: string }): Promise<User> => {
  return fetch(`${apiUlr}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)

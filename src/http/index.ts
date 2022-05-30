import { useAuth } from '@/context/auth-context'
import qs from 'qs'
import * as auth from '@/auth-provider'

const apiUlr = process.env.REACT_APP_API_URL

interface FetchConfig extends RequestInit {
  token?: string
  data?: object
}

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: FetchConfig = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      ...headers,
    },

    ...customConfig,
  }
  if (config.method.toUpperCase() === 'GET') {
    url += `?${qs.stringify(data)}`
  }
  return window.fetch(`${apiUlr}/${url}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登陆' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  return (...[url, config]: Parameters<typeof http>) => http(url, { ...config, token: user?.token })
}

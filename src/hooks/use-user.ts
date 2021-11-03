import { useHttp } from '@/http'
import { User } from '@/screens/project-list/search-panel'
import { useEffect } from 'react'
import { useDidMount } from 'rooks'
import { useAsync } from './use-async'

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()

  useDidMount(() => {
    run(client('users'))
  })

  useEffect(() => {
    run(client('users', { data: param }))
    // eslint-disable-next-line
  }, [param]);
  return result
}

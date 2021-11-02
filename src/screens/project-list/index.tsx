import React, { useState, useEffect } from 'react'
import { useDebounce, useDidMount } from 'rooks'
import { useHttp } from '@/http'
import { cleanObject } from '@/utils'
import { List } from './list'
import { SearchPanel } from './search-panel'
import styled from '@emotion/styled'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: '', personId: '' })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const client = useHttp()
  const debouncedParam = useDebounce(setParam, 500)
  useEffect(() => {
    client('projects', { data: cleanObject(param) }).then(setList)
    // eslint-disable-next-line
  }, [param]);
  useDidMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={debouncedParam} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding:  3.2rem;
`

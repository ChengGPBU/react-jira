import React, { useState, useEffect } from 'react'
import { useDebounce, useDidMount } from 'rooks'
import { useHttp } from '@/http'
import { cleanObject } from '@/utils'
import { List, Project } from './list'
import { SearchPanel } from './search-panel'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from '@/hooks/use-project'
import { useUsers } from '@/hooks/use-user'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: '', personId: '' })
  const debouncedParam = useDebounce(setParam, 500)
  const { isLoading, error, data: list } = useProjects(param)
  const { data: users } = useUsers()

  return (
    <Container>
      <SearchPanel users={users || []} param={param} setParam={debouncedParam} />
      {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
      <List dataSource={list || []} loading={isLoading} users={users || []} />
    </Container>
  )
}

const Container = styled.div`
  padding:  3.2rem;
`

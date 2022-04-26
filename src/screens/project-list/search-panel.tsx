import React from 'react'
import { Form, Input, Select } from 'antd'
import { Project } from './list'
export interface User {
  id: number
  name: string
  organization: string
  ownerId: number
}
interface SearchPanelProps {
  users: User[]
  param: Pick<Project, 'name' | 'personId'>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout='inline'>
      <Form.Item>
        <Input
          placeholder={'项目名称'}
          type='text'
          value={param.name}
          onChange={(evt) => {
            console.log('~~~~~~~~~~~~~onChange', evt)
            setParam({ ...param, name: evt.target.value })
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value=''>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={String(user.id)} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

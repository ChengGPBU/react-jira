import React from 'react'
import { useAuth } from '@/context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from '.'

export const LoginScreen = () => {
  const { login, user } = useAuth()

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户民' }]}>
        <Input type='text' placeholder={'用户名'} id={'username'} />
      </Form.Item>

      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type='password' placeholder={'密码'} id={'password'} />
      </Form.Item>

      <LongButton htmlType='submit' type='primary'>
        login
      </LongButton>
    </Form>
  )
}

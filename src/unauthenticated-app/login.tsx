import React, { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from '.'
import { useAsync } from '@/hooks/use-async'

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await run(login(values))
    } catch (error) {
      console.log('~~~~~~~~error', error)
      if (error instanceof Error) {
        console.log('~~~~~~~~error', error)
        onError(error)
      } else {
        console.log('~~~~~~~~error', error)
        onError({ message: '未知错误', name: '' })
      }
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户民' }]}>
        <Input type='text' placeholder={'用户名'} id={'username'} />
      </Form.Item>

      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type='password' placeholder={'密码'} id={'password'} />
      </Form.Item>

      <LongButton loading={isLoading} htmlType='submit' type='primary'>
        login
      </LongButton>
    </Form>
  )
}

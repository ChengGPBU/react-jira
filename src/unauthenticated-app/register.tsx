import React from 'react'
import { useAuth } from '@/context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from '.'
import { useAsync } from '@/hooks/use-async'

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError({ message: '前后密码不一致', name: '' })
      return
    }
    try {
      await run(register(values))
    } catch (error) {
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

      <Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
        <Input type='password' placeholder={'请确认密码'} id={'password'} />
      </Form.Item>

      <LongButton loading={isLoading} htmlType='submit' type='primary'>
        注册
      </LongButton>
    </Form>
  )
}

import { useAuth } from '@/context/auth-context'
import React, { FormEvent } from 'react'

export const LoginScreen = () => {
  const { login, user } = useAuth()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    loginAction(name, password)
  }

  const loginAction = (name: string, password: string) => {
    fetch(' http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    }).then()
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>name</label>
        <input type='text' id={'username'} />
      </div>

      <div>
        <label htmlFor='password'>mima</label>
        <input type='password' id={'password'} />
      </div>

      <button type='submit'>login</button>
    </form>
  )
}

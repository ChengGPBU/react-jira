import React from 'react'
import { LoginScreen } from './screens/login'
import logo from './logo.svg'
import './App.css'
import { ceshi } from '@utils/test'

function App(): JSX.Element {
  console.log(process.env.NODE_ENV)

  return (
    <div className='App'>
      <LoginScreen />
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <button
          onClick={() => {
            ceshi(111)
          }}
        >
          test
        </button>
      </header>
    </div>
  )
}

export default App

import { useState } from 'react'

interface State<D> {
  error: Error | null
  data: D | null
  state: 'idel' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  state: 'idel',
  data: null,
  error: null,
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [reqState, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  })

  const setData = (data: D) =>
    setState({
      data,
      state: 'success',
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      error,
      state: 'error',
      data: null,
    })

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    setState({ ...reqState, state: 'loading' })
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((error) => {
        setError(error)
        return error
      })
  }

  return {
    isIdel: reqState.state === 'idel',
    isLoading: reqState.state === 'loading',
    isError: reqState.state === 'error',
    isSuccess: reqState.state === 'success',
    run,
    setData,
    setError,
    ...reqState,
  }
}

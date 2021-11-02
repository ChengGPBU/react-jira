/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj }
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => {
      setValue([...value, item])
    },
    clear: () => {
      setValue([])
    },
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
  }
}

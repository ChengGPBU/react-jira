import React from 'react'
import { Row } from '@/types'
import { Select } from 'antd'

type SelectPorps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectPorps, 'value' | 'onChange' | 'options'> {
  value: Row | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}
/**
 *
 *
 * @param {IdSelectProps} props
 * @return {*}
 */
const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...resetPorps } = props
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...resetPorps}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))

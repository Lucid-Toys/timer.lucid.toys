import { SyntheticEvent, useState } from "react"
import Input from "./Input"

interface Props {
  value?: number
  label: string
  onChange: (SyntheticEvent?) => number | void
  max?: number
}

export default function TimeInput({
  value: initialValue,
  label,
  onChange = () => null,
  max = 59,
}: Props) {
  const [value, setValue] = useState(initialValue)

  const inputChanged = (e: SyntheticEvent) => {
    const target = e.currentTarget as HTMLInputElement
    const v = onChange(e)
    setValue(v ? v : Number(target.value))
    return onChange(e)
  }

  return (
    <Input
      label={label}
      value={value}
      onChange={inputChanged}
      type="number"
      pattern="[0-9]*"
      min={0}
      max={max}
    />
  )
}

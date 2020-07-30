import { useState } from "react"
import Input from "./Input"

export default function TimeInput({
  value: initialValue,
  label,
  onChange = () => null,
  max = 59,
}) {
  const [value, setValue] = useState(initialValue)

  const inputChanged = (e) => {
    const v = onChange(e)
    setValue(v ? v : e.currentTarget.value)
    return onChange(e)
  }

  return (
    <Input
      label={label}
      value={value}
      onChange={inputChanged}
      type="number"
      pattern="[0-9]+"
      min={0}
      max={max}
    />
  )
}

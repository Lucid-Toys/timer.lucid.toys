import { useState } from "react"
import Input from "./Input"

export default function TimeInput({
  initialValue,
  label,
  onChange = () => null,
}) {
  const [value, setValue] = useState(initialValue)

  const inputChanged = e => {
    onChange(e)
    setValue(String(e.currentTarget.value).padStart(2, "0"))
  }

  return (
    <Input
      label={label}
      initialValue={value}
      onChange={inputChanged}
      type="number"
      pattern="[0-9]+"
      min={0}
    />
  )
}

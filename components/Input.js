import styled from "@emotion/styled"
import { useState } from "react"

const Label = styled.label`
  display: inline-block;
  margin-bottom: 1.5rem;

  :focus-within {
    color: var(--focus);
  }
`

const TextLabel = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 600;
`

const StyledInput = styled.input`
  appearance: none;
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid;
  border-radius: 0;
  color: inherit;
  display: block;
  font: inherit;
  font-size: var(--mega-size);
  line-height: 1;
  outline: none;
  width: 2.45ch;
  text-align: center;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default function Input({
  value: initialValue,
  label,
  onChange = () => null,
  type = "text",
  pattern,
  min,
  max,
}) {
  const [value, setValue] = useState(initialValue)

  const inputChanged = (e) => {
    const v = onChange(e)
    setValue(v ? v : e.currentTarget.value)
  }

  const numberFormatted = (n) => {
    return String(Math.max(Math.min(Number(n), max), min)).padStart(2, "0")
  }

  return (
    <Label>
      <TextLabel>{label}</TextLabel>
      <StyledInput
        onChange={inputChanged}
        type={type}
        value={numberFormatted(value)}
        pattern={pattern}
        min={min}
        max={max}
      />
    </Label>
  )
}

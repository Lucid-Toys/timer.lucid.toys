import styled from "@emotion/styled"

const StyledButton = styled.button`
  appearance: none;
  border: 0;
  border-radius: 0.25em;
  font-size: 2rem;
  font-weight: 500;
  color: var(--dark);
  background-color: var(--focus);
  display: block;
  width: 100%;
  padding: 0.25em;
  cursor: pointer;
`

export default function Button({ label, onClick }) {
  return <StyledButton onClick={onClick}>{label}</StyledButton>
}

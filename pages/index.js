import styled from "@emotion/styled"
import Countdown from "react-countdown-now"
import Button from "../components/Button"
import TimeInput from "../components/TimeInput"

const Container = styled.div`
  align-self: center;
  justify-self: center;
  margin: auto;
`

const formatTime = n => String(n).padStart(2, "0")

const renderer = ({ hours, minutes, seconds, completed }) => {
  const { hh, mm, ss } = {
    hh: formatTime(hours),
    mm: formatTime(minutes),
    ss: formatTime(seconds),
  }
  if (completed) {
    // Render a completed state
    return <div>Time's up.</div>
  } else {
    // Render a countdown
    return (
      <span>
        {hh}:{mm}:{ss}
      </span>
    )
  }
}

export default function Index() {
  return (
    <Container>
      <div>
        <TimeInput label="Hours" initialValue="00" />
        <TimeInput label="Minutes" initialValue="10" />
        <TimeInput label="Seconds" initialValue="00" />
      </div>
      <div>
        <Button label="Start Timer" />
      </div>
      <Countdown date={Date.now() + 10000} renderer={renderer} />
    </Container>
  )
}

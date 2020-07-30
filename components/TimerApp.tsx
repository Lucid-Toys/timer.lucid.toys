import styled from "@emotion/styled"
import React from "react"
import Countdown from "react-countdown-now"
import Button from "./Button"
import CountdownRenderer from "./CountdownRenderer"
import TimeInput from "./TimeInput"

const { useState, useEffect } = React

const Container = styled.div`
  align-self: center;
  justify-self: center;
  margin: auto;
`

export default function TimerApp({
  h = 0,
  m = 10,
  s = 0,
  running: initiallyRunning = false,
}) {
  const [running, setRunning] = useState(initiallyRunning)
  const [seconds, setSeconds] = useState(s)
  const [minutes, setMinutes] = useState(m)
  const [hours, setHours] = useState(h)
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    const hToS = hours * 3600
    const mToS = minutes * 60
    setTotalTime(seconds + mToS + hToS)
  }, [hours, minutes, seconds])

  const updateTime = (from, e) => {
    const value = Number(e.currentTarget.value)
    let mins, hrs, secs, leftover
    switch (from) {
      case "h":
        setHours(value)
        break
      case "m":
        mins = value % 60
        hrs = Math.floor((value - mins) / 60)
        setHours(hours + hrs)
        setMinutes(mins)
        break
      case "s":
      default:
        secs = value % 60
        leftover = value - secs
        mins = Math.floor((value - secs) / 60)
        hrs = Math.floor((value - mins) / 3600)
        setHours(hours + hrs)
        setMinutes(minutes + mins)
        setSeconds(secs)
        break
    }

    return e.currentTarget.value
  }

  return (
    <Container>
      {running ? (
        <Countdown
          date={Date.now() + totalTime * 1000}
          renderer={CountdownRenderer}
        />
      ) : (
        <div>
          <TimeInput
            label="Hours"
            value={hours}
            onChange={(e) => updateTime("h", e)}
            max={23}
          />
          <TimeInput
            label="Minutes"
            value={minutes}
            onChange={(e) => updateTime("m", e)}
          />
          <TimeInput
            label="Seconds"
            value={seconds}
            onChange={(e) => updateTime("s", e)}
          />
        </div>
      )}
      <div>
        <Button
          variant={running ? "danger" : "default"}
          label={`${running ? "Stop" : "Start"} Timer`}
          onClick={() => setRunning(!running)}
        />
      </div>
    </Container>
  )
}

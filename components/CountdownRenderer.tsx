import { useEffect } from "react"
import AudioPlayer from "./AudioPlayer"

const IS_CLIENT = typeof window !== "undefined"
const formatTime = (n) => String(n).padStart(2, "0")

const sendNotification = () => {
  if (!IS_CLIENT) {
    return
  }

  if (!("Notification" in window)) {
    return
  }

  if (Notification.permission === "granted") {
    const notification = new Notification(`Timer finished`, {
      body: `Finished at ${Date.now().toLocaleString()}`,
      vibrate: [200, 100, 200],
      requireInteraction: true,
    })
  }

  return true
}

const CompletedNotificationRenderer = ({ completed }) => {
  useEffect(() => {
    if (completed) {
      sendNotification()
    }
  }, [completed])

  return <></>
}

const CountdownRenderer = ({ hours, minutes, seconds, completed }) => {
  const { hh, mm, ss } = {
    hh: formatTime(hours),
    mm: formatTime(minutes),
    ss: formatTime(seconds),
  }

  const timeAlmostUp = hours === 0 && minutes === 0 && seconds <= 10

  return (
    <>
      {completed && <AudioPlayer />}
      {completed && <CompletedNotificationRenderer completed={completed} />}
      <span
        className={[
          completed ? "completed" : "",
          timeAlmostUp ? "blink" : "",
        ].join(" ")}
      >
        {hh}:{mm}:{ss}
      </span>
      <style jsx>{`
        span {
          font-size: var(--mega-size);
          display: inline-block;
          margin: 0.1em 0;
          font-feature-settings: "case";
        }

        .completed {
          color: var(--danger);
        }

        .blink {
          animation: blink 1s linear infinite;
        }

        @keyframes blink {
          to {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  )
}

export default CountdownRenderer

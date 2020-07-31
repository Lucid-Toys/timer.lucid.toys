import { useEffect } from "react"
import AudioPlayer from "./AudioPlayer"

const IS_CLIENT = typeof window !== "undefined"
const formatTime = (n) => String(n).padStart(2, "0")

const sendNotification = () => {
  if (!IS_CLIENT) {
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

  return (
    <>
      {completed && <AudioPlayer />}
      {completed && <CompletedNotificationRenderer completed={completed} />}
      <span className={completed ? "completed" : ""}>
        {hh}:{mm}:{ss}
      </span>
      <style jsx>{`
        span {
          font-size: var(--mega-size);
          display: inline-block;
          margin: 0.1em 0;
          animation: blink 1s linear infinite;
          font-feature-settings: "case";
        }

        .completed {
          color: var(--danger);
          animation: none;
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

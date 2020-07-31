import AudioPlayer from "./AudioPlayer"

const formatTime = (n) => String(n).padStart(2, "0")

const CountdownRenderer = ({ hours, minutes, seconds, completed }) => {
  const { hh, mm, ss } = {
    hh: formatTime(hours),
    mm: formatTime(minutes),
    ss: formatTime(seconds),
  }

  return (
    <>
      {completed && <AudioPlayer />}
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

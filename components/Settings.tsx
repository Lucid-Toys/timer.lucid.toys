import { useSettings } from "./SettingsContext"

export default function Settings() {
  const settings = useSettings()
  const [audio, setAudio] = settings.audio
  const [notifications, setNotifications] = settings.notifications

  return (
    <>
      <div className="layer">
        <div className="container">
          <label>
            <input
              type="checkbox"
              checked={audio}
              onChange={() => setAudio(!audio)}
            />
            Play audio when timer ends
          </label>

          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            Show notification when timer ends
          </label>
        </div>
      </div>
      <style jsx>{`
        .layer {
          position: absolute;
          bottom: 1em;
          left: 1em;
          right: 1em;
        }

        .container {
          display: flex;
          padding: 1em;
          flex-direction: column;
          opacity: 0.5;
          transition: 0.3s ease;
        }

        .container:hover,
        .container:focus-within {
          opacity: 1;
        }

        input {
          margin-right: 0.25em;
        }
      `}</style>
    </>
  )
}

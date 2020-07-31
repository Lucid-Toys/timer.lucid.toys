import { useEffect, useState } from "react"
import { useSettings } from "./SettingsContext"

const IS_CLIENT = typeof window !== "undefined"
const notifsAvailableOnClient = IS_CLIENT ? "Notification" in window : false

type NotificationsPermission = "default" | "denied" | "granted" | false

const checkNotificationsGranted = () => {
  if (!IS_CLIENT) {
    return false
  }

  if (!("Notification" in window)) {
    return false
  }

  return Notification.permission
}

const setupNotifications = (setup: boolean) => {
  const permission = checkNotificationsGranted()

  if (permission == false) {
    return
  }

  if (setup && permission !== "denied" && permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log("Notifications granted")
      }
    })
  } else {
    return false
  }
}

export default function Settings() {
  const settings = useSettings()
  const [audio, setAudio] = settings.audio
  const [notifications, setNotifications] = settings.notifications
  const [remember, setRemember] = settings.remember
  const [notifsAvailable, setNotifsAvailable] = useState<
    NotificationsPermission
  >(false)

  useEffect(() => {
    setNotifsAvailable(checkNotificationsGranted())
  }, [remember, notifications, notifsAvailable])

  const notifsChanged = () => {
    const newVal = !notifications
    setupNotifications(newVal)
    setNotifications(newVal)
  }

  return (
    <>
      <div className="layer">
        <details className="container">
          <summary>
            <strong>Settings</strong>
          </summary>
          <div className="stack">
            <label>
              <input
                type="checkbox"
                defaultChecked={audio}
                onInput={() => setAudio(!audio)}
              />
              Play audio when timer ends
              <small className="setting-description">
                Note that in most browsers, audio will not play until the page
                has been interacted with (e.g. clicked).
              </small>
            </label>

            {notifsAvailableOnClient && (
              <label>
                <input
                  type="checkbox"
                  defaultChecked={notifications}
                  onInput={notifsChanged}
                />
                Show notification when timer ends
                <small className="setting-description">
                  {!notifsAvailable && (
                    <>
                      <strong>Notifications not currently available.</strong>{" "}
                      When enabling, the browser will ask if you want to allow
                      notifications.
                    </>
                  )}
                </small>
              </label>
            )}

            <hr />

            <label>
              <input
                type="checkbox"
                defaultChecked={remember}
                onInput={() => setRemember(!remember)}
              />
              Remember these settings
              <small className="setting-description">
                When enabled, settings will be saved to local storage.
              </small>
            </label>
          </div>
        </details>
      </div>
      <style jsx>{`
        .layer {
          position: absolute;
          bottom: 0;
          left: 0;
          margin: 1em;
        }

        .container {
          padding: 1em;
          transition: 0.3s ease;
          background-color: rgba(60, 60, 60, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 1em;
          display: flex;
          max-width: 30em;
        }

        summary {
          cursor: pointer;
        }

        .stack {
          display: flex;
          flex-direction: column;
          margin-top: 0.5em;
        }

        input {
          margin-right: 0.25em;
        }

        hr {
          border: none;
          border-top: 1px solid var(--med);
          margin: 0.5em 0;
        }

        .setting-description {
          opacity: 0.8;
          font-size: 0.875em;
          display: block;
          margin-top: 0.25em;
        }

        :not(:last-child) .setting-description {
          margin-bottom: 1em;
        }
      `}</style>
    </>
  )
}

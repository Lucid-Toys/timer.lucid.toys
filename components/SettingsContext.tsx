import React, { useContext, useEffect, useMemo, useState } from "react"
type BooleanState = [boolean, React.Dispatch<boolean>]

const IS_CLIENT = typeof window !== "undefined"

interface Props {
  audio: BooleanState
  notifications: BooleanState
  remember: BooleanState
}

const keys = {
  AUDIO: "audioAlert",
  NOTIFS: "notificationsAlert",
  REMEMBER: "rememberSettings",
}

const SettingsContext = React.createContext<Props | null>(null)

const SettingsProvider = (props) => {
  const defaults = {
    audio: IS_CLIENT ? JSON.parse(localStorage.getItem(keys.AUDIO)) : false,
    notifications: IS_CLIENT
      ? JSON.parse(localStorage.getItem(keys.NOTIFS))
      : false,
    remember: IS_CLIENT
      ? JSON.parse(localStorage.getItem(keys.REMEMBER))
      : false,
  }
  const [audio, setAudio] = useState(defaults.audio)
  const [notifications, setNotifications] = useState(defaults.notifications)
  const [remember, setRemember] = useState(defaults.remember)

  useEffect(() => {
    if (remember) {
      console.log("saving items")
      localStorage.setItem(keys.AUDIO, JSON.stringify(audio))
      localStorage.setItem(keys.NOTIFS, JSON.stringify(notifications))
      localStorage.setItem(keys.REMEMBER, JSON.stringify(remember))
    } else {
      console.log("clearing items")
      localStorage.clear()
    }
  }, [audio, notifications, remember])

  const settings = useMemo(() => {
    return {
      audio: [audio, setAudio],
      notifications: [notifications, setNotifications],
      remember: [remember, setRemember],
    }
  }, [audio, notifications, remember])
  return <SettingsContext.Provider value={settings} {...props} />
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }

  return context
}

export default SettingsProvider

import React, { useContext, useMemo, useState } from "react"
type BooleanState = [boolean, React.Dispatch<boolean>]

interface Props {
  audio: BooleanState
  notifications: BooleanState
}

const SettingsContext = React.createContext<Props | null>(null)

const SettingsProvider = (props) => {
  const [audio, setAudio] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const settings = useMemo(() => {
    return {
      audio: [audio, setAudio],
      notifications: [notifications, setNotifications],
    }
  }, [audio, notifications])
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

import Head from "next/head"
import Settings from "../components/Settings"
import SettingsProvider from "../components/SettingsContext"
import TimerApp from "../components/TimerApp"

export default function Index({ h, m, s, running = false }) {
  let initial
  if (h === 0 && m === 0 && s === 0) {
    initial = {
      h: 0,
      m: 10,
      s: 0,
    }
  } else {
    initial = {
      s: Number(s) % 60,
      m: (Number(m) + Math.floor(Number(s) / 60)) % 60,
      h: Number(h) + Math.floor(Number(m) / 60) + Math.floor(Number(s) / 3600),
    }
  }

  return (
    <SettingsProvider>
      <Head>
        <title>Lucid Timer</title>
      </Head>
      <TimerApp h={initial.h} m={initial.m} s={initial.s} running={running} />
      <Settings />
    </SettingsProvider>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { h = 0, m = 0, s = 0, running = false },
  } = context
  return {
    props: { h, m, s, running },
  }
}

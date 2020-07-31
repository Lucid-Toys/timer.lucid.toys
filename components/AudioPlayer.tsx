import { useEffect } from "react"
import { useSettings } from "./SettingsContext"

function playNote(length: number = 1.5, pitch: number = 200) {
  const ctx = new AudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const biquadFilter = ctx.createBiquadFilter()
  const compressor = ctx.createDynamicsCompressor()

  compressor.threshold.setValueAtTime(-50, ctx.currentTime)
  compressor.knee.setValueAtTime(40, ctx.currentTime)
  compressor.ratio.setValueAtTime(12, ctx.currentTime)
  compressor.attack.setValueAtTime(0, ctx.currentTime)
  compressor.release.setValueAtTime(0.25, ctx.currentTime)

  biquadFilter.type = "highpass"
  biquadFilter.frequency.setValueAtTime(300, ctx.currentTime)
  biquadFilter.gain.setValueAtTime(25, ctx.currentTime)

  osc.type = "sine"

  gain.gain.setValueAtTime(0.6, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + length)

  osc.frequency.setValueAtTime(pitch, ctx.currentTime)

  osc.connect(gain)
  gain.connect(compressor)
  compressor.connect(biquadFilter)
  biquadFilter.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + length)
  ctx.resume()
}

function playLoop(duration: number) {
  playNotes(duration)
  const loop = setInterval(() => {
    playNotes(duration)
  }, duration)

  return () => clearInterval(loop)
}

function playNotes(duration: number) {
  const topNotes = [400, 300, , 220, 250, 250, 400, 300]
  topNotes.length *= 2
  const eachDuration = duration / topNotes.length

  topNotes.map((note, i) => {
    setTimeout(() => playNote(0.5, note), eachDuration * i)
  })

  const bottomNotes = [100, , , , 100, , , 150]
  bottomNotes.map((note, i) => {
    setTimeout(() => playNote(1.5, note), eachDuration * i)
  })
}

export default function AudioPlayer() {
  const settings = useSettings()
  const [audio] = settings.audio

  useEffect(() => {
    const stopTape = audio ? playLoop(2000) : () => {}

    return stopTape
  }, [audio])

  return <></>
}

import React from 'react'

export const AudioContext = React.createContext<AudioData>(null)

type AudioData = HTMLAudioElement | null

export function useAudio() {
  return React.useContext(AudioContext)
}

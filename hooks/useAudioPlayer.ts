import React from 'react'

import { useAudio } from '@/hooks/useAudio'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  setAudioItem,
  setAudioPaused,
  setAudioTrack,
} from '@/store/actions/audioSystem'
import { Track } from '@/store/types'

export function useAudioPlayer(
  currentTrack: Track | null,
  onTimeUpdate?: (currentTime: number) => void
) {
  const audio = useAudio()
  const dispatch = useAppDispatch()
  const paused = useAppSelector(({ audioSystem }) => audioSystem.paused)
  const active = useAppSelector(({ audioSystem }) => audioSystem.active)
  const track = active?.track ?? null
  const isCurrentTrack = track?.id === currentTrack?.id
  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)

  const currentTimeRef = React.useRef<number>(currentTime)

  function toggle(currentTrack: Track) {
    const newPaused = !paused

    if (!track || track.id !== currentTrack.id) {
      dispatch(setAudioTrack(currentTrack))

      dispatch(setAudioPaused(false))

      return
    }

    dispatch(setAudioPaused(newPaused))
  }

  function setAudioTime(time: number) {
    if (audio) {
      audio.currentTime = time
    }
  }

  function handleTimeUpdate() {
    if (!audio || track?.id !== currentTrack?.id) return

    onTimeUpdate?.(audio.currentTime)
  }

  React.useEffect(() => {
    if (!audio) return () => undefined

    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  })

  React.useEffect(() => {
    audio && setDuration(audio.duration)
  }, [active?.isLoaded])

  React.useEffect(() => {
    setCurrentTime(0)
  }, [track?.src])

  return {
    toggle,
    currentTimeRef,
    paused: isCurrentTrack ? paused : true,
    state: {
      duration,
      setDuration,
      currentTime,
      setCurrentTime,
    },
    audio,
    isCurrentTrack,
    setAudioTime,
    currentTime: formatSecondsToMmSs(currentTime),
    duration: formatSecondsToMmSs(duration),
  }
}

function formatSecondsToMmSs(seconds: number) {
  if (!seconds) {
    return '00:00'
  }

  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

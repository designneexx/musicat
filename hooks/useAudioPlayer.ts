import React from 'react'

import { useAudio } from '@/hooks/useAudio'
import { useAppDispatch, useAppSelector } from '@/store'
import { setPlayAudioTrack } from '@/store/actions/audioSystem'
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

  const onTimeUpdateRef = React.useRef<typeof onTimeUpdate>(onTimeUpdate)

  function toggle(currentTrack: Track) {
    const newPaused = !paused

    dispatch(
      setPlayAudioTrack({
        track,
        currentTrack,
        paused: newPaused,
      })
    )
  }

  function updateAudioTime() {
    if (!audio) return

    setCurrentTime((prevState) => {
      audio.currentTime = prevState

      return prevState
    })
  }

  function getTimeUpdate(audio: HTMLAudioElement) {
    return () => {
      onTimeUpdateRef.current?.(audio.currentTime)
    }
  }

  React.useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate
  })

  React.useEffect(() => {
    if (!audio) return () => undefined

    const onTimeUpdate = getTimeUpdate(audio)

    audio.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [audio])

  React.useEffect(() => {
    audio && setDuration(audio.duration)
  }, [active?.isLoaded])

  React.useEffect(() => {
    setCurrentTime(0)
  }, [track?.src])

  return {
    toggle,
    paused: isCurrentTrack ? paused : true,
    state: {
      duration,
      setDuration,
      currentTime,
      setCurrentTime,
    },
    audio,
    isCurrentTrack,
    updateAudioTime,
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

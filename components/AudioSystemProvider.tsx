import Head from 'next/head'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { AudioContext } from '@/hooks/useAudio'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  setAudioError,
  setAudioLoaded,
  setNextAudioTrack,
} from '@/store/actions/audioSystem'

export default function AudioSystemProvider({
  children,
}: {
  children(isSelectedTrack: boolean): React.ReactNode
}) {
  const [tokenG, setTokenG] = useLocalStorage<string | null>('userToken', null)
  const profile = useAppSelector(({ user }) => user.profile)
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null)
  const dispatch = useAppDispatch()
  const playlist = useAppSelector(({ playlist }) => playlist.active)
  const paused = useAppSelector(({ audioSystem }) => audioSystem.paused)
  const loop = useAppSelector(({ audioSystem }) => audioSystem.loop)
  const muted = useAppSelector(({ audioSystem }) => audioSystem.muted)
  const active = useAppSelector(({ audioSystem }) => audioSystem.active)
  const volume = useAppSelector(({ audioSystem }) => audioSystem.volume)
  const track = active?.track ?? null
  const isSelectedTrack = Boolean(audio) && Boolean(track)

  React.useEffect(() => {
    if (!track?.src) return

    if (!audio) {
      const newAudio = new Audio(track.src)

      return setAudio(newAudio)
    }

    if (audio.src !== track.src) audio.src = track.src
  }, [track?.src, audio])

  React.useEffect(() => {
    if (!audio) return

    audio.muted = muted
    audio.loop = loop
    audio.volume = volume

    audio.duration !== 0 && playAudio(audio)

    audio.addEventListener('loadedmetadata', onLoadedMetaData)

    audio.addEventListener('error', onError)

    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetaData)

      audio.removeEventListener('ended', onEnded)

      audio.removeEventListener('error', onError)
    }
  })

  function onEnded() {
    !loop && dispatch(setNextAudioTrack({ playlist: playlist.tracks, track }))
  }

  function onLoadedMetaData() {
    if (!audio) return

    playAudio(audio)

    dispatch(setAudioLoaded(true))
  }

  function onError() {
    dispatch(setAudioError(true))
  }

  function playAudio(audio: HTMLAudioElement) {
    if (!paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  return (
    <AudioContext.Provider value={audio}>
      {children(Boolean(audio) && Boolean(track))}
      <Head>
        {isSelectedTrack ? (
          <title>{`${track?.artist.name} - ${track?.title}`}</title>
        ) : (
          <title>Musicat</title>
        )}
      </Head>
    </AudioContext.Provider>
  )
}

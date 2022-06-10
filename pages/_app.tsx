import '../styles/globals.css'
import 'react-h5-audio-player/lib/styles.css'
import 'react-toastify/dist/ReactToastify.css'
import 'rc-slider/assets/index.css'

import {
  ChevronDownIcon,
  ChipIcon,
  HeartIcon,
  LightBulbIcon,
  MoonIcon,
  MusicNoteIcon,
  SearchIcon,
  StarIcon,
} from '@heroicons/react/solid'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { themeChange } from 'theme-change'
import { useLocalStorage } from 'usehooks-ts'

import AudioSystem from '@/components/AudioSystem'
import { AudioContext } from '@/hooks/useAudio'
import { store, useAppDispatch, useAppSelector } from '@/store'
import { setRootState } from '@/store/actions/app'
import {
  setAudioError,
  setAudioItem,
  setAudioLoaded,
  setAudioPaused,
} from '@/store/actions/audioSystem'

const queryClient = new QueryClient()

function AudioSystemProvider({ children }: React.PropsWithChildren<any>) {
  const store = useAppSelector((state) => state)
  const [isStateLoaded, setIsStateLoaded] = React.useState<boolean>(false)
  const [localStore, setLocalStore] = useLocalStorage('localStore', store)
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null)
  const dispatch = useAppDispatch()
  const playlist = useAppSelector(({ playlist }) => playlist.active)
  const paused = useAppSelector(({ audioSystem }) => audioSystem.paused)
  const loop = useAppSelector(({ audioSystem }) => audioSystem.loop)
  const muted = useAppSelector(({ audioSystem }) => audioSystem.muted)
  const active = useAppSelector(({ audioSystem }) => audioSystem.active)
  const volume = useAppSelector(({ audioSystem }) => audioSystem.volume)

  const track = active?.track ?? null

  React.useEffect(() => {
    !isStateLoaded && dispatch(setRootState(localStore))
    setIsStateLoaded(true)
  }, [localStore])

  React.useEffect(() => {
    if (isStateLoaded) {
      setLocalStore(store)
    }
  }, [store])

  React.useEffect(() => {
    if (!track?.src) return

    if (!audio) {
      const newAudio = new Audio(track.src)

      return setAudio(newAudio)
    }

    if (audio.src !== track.src) audio.src = track.src
  }, [track?.src, audio])

  React.useEffect(() => {
    if (!track || !audio) return

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
    }
  })

  function onEnded() {
    const playlistIndex = playlist.findIndex((item) => item.id === track?.id)

    if (playlistIndex !== -1) {
      const newPlaylistIndex = playlistIndex + 1

      if (newPlaylistIndex === playlist.length) {
        dispatch(
          setAudioItem({
            isLoaded: false,
            isError: false,
            isLoading: true,
            track: playlist[0],
          })
        )

        return
      }

      const track = playlist[newPlaylistIndex]

      dispatch(
        setAudioItem({
          isLoaded: false,
          isLoading: true,
          isError: false,
          track,
        })
      )
    } else {
      !loop && dispatch(setAudioPaused(true))
    }
  }

  function onLoadedMetaData() {
    if (!track || !audio) return

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
      {children}
      <AudioSystem isSelectedTrack={Boolean(audio)} />
    </AudioContext.Provider>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    themeChange(false)
  })

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AudioSystemProvider>
          <div>
            <div className="navbar shadow-lg bg-base-100">
              <div className="grid container grid-cols-[max-content,.5fr] justify-between">
                <div className="flex-1 px-2 mx-2 lg:flex-none">
                  <div className="text-lg font-bold flex items-center">
                    <MusicNoteIcon className="w-5 h-5 block mr-2 text-primary" />
                    <Link href="/">
                      <span className="cursor-pointer">
                        <span className="text-success">Musi</span>
                        <span className="text-error">cat</span>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="flex gap-1 ml-auto">
                  <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                      <li>
                        <Link href="/playlists" className="gap-1">
                          Мои плейлисты
                        </Link>
                      </li>
                      <li>
                        <Link href="/favorites" className="gap-1">
                          <span>
                            <HeartIcon className="w-4 h-4 text-error" />
                            Избранное
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                      <li tabIndex={0}>
                        <a className="gap-1">
                          <StarIcon className="w-4 h-4 text-base-content" />
                          Тема
                          <ChevronDownIcon className="w-4 h-4" />
                        </a>
                        <ul className="p-2 bg-base-100 shadow-md z-50">
                          <li>
                            <button
                              className="gap-1"
                              data-set-theme="dark"
                              data-act-class="text-primary"
                            >
                              <MoonIcon className="w-4 h-4" />
                              Темная
                            </button>
                          </li>
                          <li>
                            <button
                              className="gap-1"
                              data-set-theme="light"
                              data-act-class="text-primary"
                            >
                              <LightBulbIcon className="w-4 h-4" />
                              Светлая
                            </button>
                          </li>
                          <li>
                            <button
                              className="gap-1"
                              data-set-theme="cyberpunk"
                              data-act-class="text-primary"
                            >
                              <ChipIcon className="w-4 h-4" />
                              Киберпанк
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Component {...pageProps} />
        </AudioSystemProvider>
        <div>
          <ToastContainer />
        </div>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp

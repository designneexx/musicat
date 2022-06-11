import {
  HeartIcon,
  PauseIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import cx from 'classnames'
import Link from 'next/link'
import React from 'react'

import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  setAudioVolume,
  setNextAudioTrack,
  setPreviousAudioTrack,
  toggleAudioLoop,
  toggleAudioMuted,
  toggleAudioPaused,
} from '@/store/actions/audioSystem'
import { shufflePlaylist } from '@/store/actions/playlist'

export default function AudioSystem({ isSelectedTrack }: AudioSystemProps) {
  const dispatch = useAppDispatch()
  const playlist = useAppSelector(({ playlist }) => playlist.active)
  const paused = useAppSelector(({ audioSystem }) => audioSystem.paused)
  const loop = useAppSelector(({ audioSystem }) => audioSystem.loop)
  const muted = useAppSelector(({ audioSystem }) => audioSystem.muted)
  const volume = useAppSelector(({ audioSystem }) => audioSystem.volume)
  const active = useAppSelector(({ audioSystem }) => audioSystem.active)
  const track = active?.track ?? null
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const audioPlayer = useAudioPlayer(track, (currentTime) => {
    !isDragging && audioPlayer.state.setCurrentTime(currentTime)
  })

  function onTogglePlay() {
    dispatch(toggleAudioPaused())
  }

  function onPrevTrack() {
    dispatch(setPreviousAudioTrack({ playlist, track }))
  }

  function onNextTrack() {
    dispatch(setNextAudioTrack({ playlist, track }))
  }

  function onLoop() {
    dispatch(toggleAudioLoop())
  }

  function onToggleMute() {
    dispatch(toggleAudioMuted())
  }

  function onShufflePlaylist() {
    dispatch(shufflePlaylist())
  }

  function onChangeVolume({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAudioVolume(Number(value)))
  }

  function onBeforeChangeAudioTime() {
    setIsDragging(true)
  }

  function onAfterChangeAudioTime() {
    setIsDragging(false)

    audioPlayer.updateAudioTime()
  }

  function onChangeAudioTime({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    audioPlayer.state.setCurrentTime(Number(value))
  }

  React.useEffect(() => {
    isDragging && window.addEventListener('mouseup', onAfterChangeAudioTime)

    return () => {
      window.removeEventListener('mouseup', onAfterChangeAudioTime)
    }
  }, [isDragging])

  return (
    <div
      className="w-full bg-base-300 p-6 container z-50 fixed bottom-8 left-1/2 -translate-x-1/2 rounded shadow-lg rounded-lg"
      style={{ minHeight: '164px' }}
    >
      {isSelectedTrack ? (
        <>
          <div className="flex">
            <div className="w-full">
              <div className="flex gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      className="w-full rounded hidden md:block w-12 h-12"
                      src={track?.image}
                      alt="Album Pic"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium">{track?.title}</h3>
                    <Link href={`/artist/${track?.artist?.id}`}>
                      <p className="cursor-pointer text-sm mt-1">
                        {track?.artist.name}
                      </p>
                    </Link>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={onToggleMute}
                      className={cx('btn btn-ghost p-0 hover:bg-transparent', {
                        'opacity-50': !volume || muted,
                      })}
                    >
                      {!volume || muted ? (
                        <VolumeOffIcon className="w-6 h-6" />
                      ) : (
                        <VolumeUpIcon className="w-6 h-6" />
                      )}
                    </button>
                    <div className="flex gap-1 items-center">
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={onChangeVolume}
                        className="range range-xs w-[100px]"
                      />
                      <span>{Math.floor(volume * 100)}</span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <button className="btn btn-ghost p-0 hover:bg-transparent">
                    <HeartIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <div className="flex gap-6">
              <div className="flex justify-between gap-6 items-center">
                <button
                  className="btn btn-ghost p-0 hover:bg-transparent"
                  onClick={onShufflePlaylist}
                  disabled={playlist.length < 2}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" />
                  </svg>
                </button>
                <button
                  className="btn btn-ghost p-0 hover:bg-transparent"
                  onClick={onPrevTrack}
                  disabled={playlist.length < 2}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
                  </svg>
                </button>
                <button
                  className="btn btn-ghost p-0 hover:bg-transparent"
                  onClick={onNextTrack}
                  disabled={playlist.length < 2}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
                  </svg>
                </button>
                <button
                  className={cx('btn btn-ghost p-0 hover:bg-transparent', {
                    'text-primary': loop,
                  })}
                  onClick={onLoop}
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" />
                  </svg>
                </button>
                <button
                  className="btn btn-ghost p-0 hover:bg-transparent rounded-full bg-red-light shadow-lg"
                  onClick={onTogglePlay}
                >
                  {paused ? (
                    <PlayIcon className="w-10 h-10" />
                  ) : (
                    <PauseIcon className="w-10 h-10" />
                  )}
                </button>
              </div>
              <div className="grow">
                <div className="flex justify-between text-sm mb-2">
                  <p>{audioPlayer.currentTime}</p>
                  <p>{audioPlayer.duration}</p>
                </div>
                <input
                  type="range"
                  min={0}
                  step={0.01}
                  max={audioPlayer.state.duration}
                  value={audioPlayer.state.currentTime}
                  onChange={onChangeAudioTime}
                  onMouseDown={onBeforeChangeAudioTime}
                  className="range range-xs w-full"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex absolute top-0 left-0 h-full items-center justify-center w-full">
          <h3 className="text-xl">Вы еще не включили не один трек</h3>
        </div>
      )}
    </div>
  )
}

type AudioSystemProps = {
  isSelectedTrack: boolean
}

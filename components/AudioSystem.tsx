import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'
import { BiDevices } from '@react-icons/all-files/bi/BiDevices'
import { FaBackward } from '@react-icons/all-files/fa/FaBackward'
import { FaForward } from '@react-icons/all-files/fa/FaForward'
import { FaHeart } from '@react-icons/all-files/fa/FaHeart'
import { FaListUl } from '@react-icons/all-files/fa/FaListUl'
import { FaPause } from '@react-icons/all-files/fa/FaPause'
import { FaPlay } from '@react-icons/all-files/fa/FaPlay'
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'
import { FaShare } from '@react-icons/all-files/fa/FaShare'
import { ImLoop } from '@react-icons/all-files/im/ImLoop'
import { ImShuffle } from '@react-icons/all-files/im/ImShuffle'
import { ImVolumeHigh } from '@react-icons/all-files/im/ImVolumeHigh'
import { ImVolumeLow } from '@react-icons/all-files/im/ImVolumeLow'
import { ImVolumeMedium } from '@react-icons/all-files/im/ImVolumeMedium'
import { ImVolumeMute2 } from '@react-icons/all-files/im/ImVolumeMute2'
import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
import { toggleTrackToFavorite } from '@/store/actions/user'
import { Track } from '@/store/types'

function VolumeIcon({ volume, className }: VolumeIconProps) {
  if (volume > 0.65) {
    return <ImVolumeHigh className={className} />
  }

  if (volume > 0.32) {
    return <ImVolumeMedium className={className} />
  }

  return <ImVolumeLow className={className} />
}

type VolumeIconProps = {
  volume: number
  className?: string
}

export default function AudioSystem() {
  const dispatch = useAppDispatch()
  const playlist = useAppSelector(({ playlist }) => playlist.active)
  const paused = useAppSelector(({ audioSystem }) => audioSystem.paused)
  const loop = useAppSelector(({ audioSystem }) => audioSystem.loop)
  const muted = useAppSelector(({ audioSystem }) => audioSystem.muted)
  const volume = useAppSelector(({ audioSystem }) => audioSystem.volume)
  const active = useAppSelector(({ audioSystem }) => audioSystem.active)
  const favorites = useAppSelector(({ user }) => user.favoritesTracks)
  const track = active?.track ?? null
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const audioPlayer = useAudioPlayer(track, (currentTime) => {
    !isDragging && audioPlayer.state.setCurrentTime(currentTime)
  })
  const router = useRouter()

  function isFavorite(track: Track | null) {
    return Boolean(favorites.find((item) => item.id === track?.id))
  }

  function onTogglePlay() {
    dispatch(toggleAudioPaused())
  }

  function onViewPlaylist() {
    router.push({
      pathname: `/playlist`,
    })
  }

  function onPrevTrack() {
    dispatch(setPreviousAudioTrack({ playlist: playlist.tracks, track }))
  }

  function onNextTrack() {
    dispatch(setNextAudioTrack({ playlist: playlist.tracks, track }))
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

  function onAddTrackToFavorite() {
    track && dispatch(toggleTrackToFavorite(track))
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
    <div className="w-full bg-base-300 p-6 rounded shadow-lg rounded-lg">
      <div className="flex">
        <div className="w-full">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative">
                <Image
                  src={track?.image || ''}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                  className="w-full rounded hidden md:block w-12 h-12"
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
                    <ImVolumeMute2 className="w-6 h-6" />
                  ) : (
                    <VolumeIcon volume={volume} className="w-6 h-6" />
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
            <div className="flex gap-2 items-center">
              <button className="btn btn-ghost p-0 hover:bg-transparent">
                <FaPlus className="w-4 h-4" />
              </button>
              <button className="btn btn-ghost p-0 hover:bg-transparent">
                <FaShare className="w-4 h-4" />
              </button>
              <button className="btn btn-ghost p-0 hover:bg-transparent">
                <BiDevices className="w-4 h-4" />
              </button>
              <button
                className="btn btn-ghost p-0 hover:bg-transparent"
                onClick={onAddTrackToFavorite}
              >
                {isFavorite(track) ? (
                  <AiFillHeart className="w-4 h-4" />
                ) : (
                  <AiOutlineHeart className="w-4 h-4" />
                )}
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
              onClick={onViewPlaylist}
            >
              <FaListUl className="w-6 h-6" />
            </button>
            <button
              className="btn btn-ghost p-0 hover:bg-transparent"
              onClick={onShufflePlaylist}
              disabled={playlist.tracks.length < 2}
            >
              <ImShuffle className="w-6 h-6" />
            </button>
            <button
              className="btn btn-ghost p-0 hover:bg-transparent"
              onClick={onPrevTrack}
              disabled={playlist.tracks.length < 2}
            >
              <FaBackward className="w-6 h-6" />
            </button>
            <button
              className="btn btn-ghost p-0 hover:bg-transparent rounded-full"
              onClick={onTogglePlay}
            >
              {paused ? (
                <FaPlay className="w-6 h-6" />
              ) : (
                <FaPause className="w-6 h-6" />
              )}
            </button>
            <button
              className="btn btn-ghost p-0 hover:bg-transparent"
              onClick={onNextTrack}
              disabled={playlist.tracks.length < 2}
            >
              <FaForward className="w-6 h-6" />
            </button>
            <button
              className={cx('btn btn-ghost p-0 hover:bg-transparent', {
                'text-primary': loop,
              })}
              onClick={onLoop}
            >
              <ImLoop className="w-6 h-6" />
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
    </div>
  )
}

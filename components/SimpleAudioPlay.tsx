import { PauseIcon, PlayIcon } from '@heroicons/react/solid'
import React from 'react'

import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { Track } from '@/store/types'

export default function SimpleAudioPlay({
  paused,
  track,
  iconClassName,
}: SimpleAudioPlayerProps) {
  const audioPlayer = useAudioPlayer(track)
  const isPaused = paused !== undefined ? paused : audioPlayer.paused

  function onPlayMusic() {
    if (!track) return

    audioPlayer.toggle(track)
  }

  return (
    <button onClick={onPlayMusic}>
      {isPaused ? (
        <PlayIcon className={iconClassName || 'w-6 h-6'} />
      ) : (
        <PauseIcon className={iconClassName || 'w-6 h-6'} />
      )}
    </button>
  )
}

type SimpleAudioPlayerProps = {
  paused?: boolean
  track: Track | null
  iconClassName?: string
}

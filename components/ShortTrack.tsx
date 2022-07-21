import { HeartIcon as OutHeaderIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import cx from 'classnames'
import Image from 'next/image'
import React from 'react'

import SimpleAudioPlay from '@/components/SimpleAudioPlay'
import { useAppSelector } from '@/store'
import { Track } from '@/store/types'

export default function ShortTrack({
  albumId,
  onViewAlbum,
  track,
  isFavorite,
  onAddToFavorite,
}: ShortTrackProps) {
  const currentTrack = useAppSelector(
    ({ audioSystem }) => audioSystem.active?.track ?? null
  )
  const { id, image, title, artist } = track

  const handleViewAlbum = () => {
    if (!albumId) return

    onViewAlbum?.(albumId)
  }

  return (
    <div
      className={cx(
        'bg-base-300 rounded shadow-lg grid grid-cols-[max-content,max-content,1fr,max-content]',
        {
          'shadow-3xl': id === currentTrack?.id,
        }
      )}
    >
      <div className="p-3 bg-base-100 flex items-center justify-center">
        <SimpleAudioPlay track={track} />
      </div>
      <div className="p-3 flex bg-base-200 items-center justify-center">
        <div
          className={cx('w-10 h-10 relative', {
            'cursor-pointer': Boolean(albumId),
          })}
          onClick={handleViewAlbum}
        >
          <Image
            src={image}
            width={40}
            height={40}
            className="w-10 h-10 rounded"
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
      </div>
      <div className="p-3 flex items-center">
        <div
          className={cx({
            'text-primary': id === currentTrack?.id,
          })}
        >
          <div className="text-lg">{title}</div>
          <span className="block">{artist.name}</span>
        </div>
      </div>
      <div className="p-3 bg-base-100 flex items-center justify-center">
        <button onClick={() => onAddToFavorite?.(track)}>
          {isFavorite ? (
            <HeartIcon className="w-4 h-4" />
          ) : (
            <OutHeaderIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}

type ShortTrackProps = {
  albumId?: number
  track: Track
  isFavorite?: boolean
  onViewAlbum?(albumId: number): void
  onAddToFavorite?(track: Track): void
}

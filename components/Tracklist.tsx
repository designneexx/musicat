import { useRouter } from 'next/router'
import React from 'react'

import ShortTrack from '@/components/ShortTrack'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleTrackToFavorite } from '@/store/actions/user'
import { Track } from '@/store/types'

export default function Tracklist({
  tracklist,
  isError,
  isLoading,
  onRefetchTracks,
}: TrackListProps) {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const favorites = useAppSelector(({ user }) => user.favoritesTracks)

  function isFavorite(track: Track) {
    return Boolean(favorites.find((item) => item.id === track.id))
  }

  function onAddTrackToFavorite(track: Track) {
    dispatch(toggleTrackToFavorite(track))
  }

  function onViewAlbum(id: number) {
    router.push({
      pathname: `/playlist/${id}`,
    })
  }

  return isLoading ? null : (
    <>
      {isLoading ? (
        <div className="flex py-6 items-center justify-center w-full">
          <svg
            role="status"
            className="w-16 h-16 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : null}

      {isError ? (
        <div className="flex flex-col gap-2">
          <div className="badge badge-error gap-2">
            Ошибка при загрузке аудиозаписей
          </div>
          <button className="btn btn-primary" onClick={onRefetchTracks}>
            Загрузить снова
          </button>
        </div>
      ) : null}

      <div className="w-full grid grid-cols-1 gap-3">
        {tracklist.map(({ track, album }) => (
          <ShortTrack
            albumId={album.id}
            track={track}
            key={track.id}
            onAddToFavorite={onAddTrackToFavorite}
            onViewAlbum={onViewAlbum}
            isFavorite={isFavorite(track)}
          />
        ))}
      </div>
    </>
  )
}

type TrackListProps = {
  tracklist: TrackList[]
  isLoading?: boolean
  isError?: boolean
  onRefetchTracks?(): void
}

type TrackList = {
  title: string
  id: number
  preview: string
  album: {
    cover: string
    cover_big: string
    title: string
    id: number
  }
  artist: {
    name: string
    id: number
  }
  track: Track
}

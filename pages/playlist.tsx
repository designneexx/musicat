import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import ShortTrack from '@/components/ShortTrack'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleTrackToFavorite } from '@/store/actions/user'
import { Track } from '@/store/types'

const PlaylistPage: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const playlist = useAppSelector(({ playlist }) => playlist.active)
  const favorites = useAppSelector(({ user }) => user.favoritesTracks)
  const tracks = playlist.tracks

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

  return (
    <div className="container py-6">
      <h3 className="text-2xl text-center pb-3">
        {`Сейчас играет: `}
        {playlist.album ? (
          <Link href={`/playlist/${playlist.album.id}`}>
            <span className="text-primary cursor-pointer">
              {playlist.album.title}
            </span>
          </Link>
        ) : (
          <span className="italic opacity-75">случайный плейлист</span>
        )}
      </h3>
      <div className="flex flex-col gap-4 justify-center">
        {tracks.map((item) => (
          <ShortTrack
            key={item.id}
            track={item}
            isFavorite={isFavorite(item)}
            onAddToFavorite={onAddTrackToFavorite}
            albumId={item.album?.id}
            onViewAlbum={onViewAlbum}
          />
        ))}
      </div>
    </div>
  )
}

export default PlaylistPage

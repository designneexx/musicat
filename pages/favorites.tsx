import { TrashIcon } from '@heroicons/react/solid'
import { nanoid } from '@reduxjs/toolkit'
import cx from 'classnames'
import { NextPage } from 'next'
import React from 'react'

import SimpleAudioPlay from '@/components/SimpleAudioPlay'
import { useAppDispatch, useAppSelector } from '@/store'
import { toggleTrackToFavorite } from '@/store/actions/user'
import { FavoriteTrack, Track } from '@/store/types'

const FavoritesPage: NextPage = () => {
  const dispatch = useAppDispatch()
  const track = useAppSelector(({ audioSystem }) => audioSystem.active?.track)
  const favorites = useAppSelector(({ user }) => user.favoritesTracks)
  const tracks = favorites?.map((item) => item.track) || []

  function onDeleteTrack(track: FavoriteTrack) {
    return () => {
      dispatch(toggleTrackToFavorite(track))
    }
  }

  return (
    <div className="container  py-6">
      <h2 className="text-2xl mb-4">{`У вас ${favorites.length} аудиозаписей в избранном`}</h2>
      <div className="w-full grid grid-cols-3 gap-3">
        {tracks.map((itemTrack) => {
          const { title, image, artist, src, id } = itemTrack

          return (
            <div
              className={cx('card bg-base-100 shadow-xl', {
                'bg-primary text-primary-content': track?.id === id,
              })}
              key={src}
            >
              <figure className="relative">
                <img src={image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <div className=" flex items-center gap-2 w-full">
                  <SimpleAudioPlay track={itemTrack} />
                  <div className="grow">
                    <h2 className="card-title">{title}</h2>
                    <p>{artist.name}</p>
                  </div>
                  <button
                    onClick={onDeleteTrack({ id: nanoid(), track: itemTrack })}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FavoritesPage

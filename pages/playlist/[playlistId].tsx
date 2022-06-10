import { HeartIcon as OutHeaderIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { nanoid } from '@reduxjs/toolkit'
import cx from 'classnames'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import SimpleAudioPlay from '@/components/SimpleAudioPlay'
import { useDeezerQuery } from '@/hooks/useDeezerQuery'
import { useAppDispatch, useAppSelector } from '@/store'
import { setPlaylist } from '@/store/actions/playlist'
import { toggleTrackToFavorite } from '@/store/actions/user'
import { Playlists, Track } from '@/store/types'

const PlaylistIdPage: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const query = router.query
  const id = Number(query.playlistId)
  const paused = useAppSelector(({ audioSystem }) => audioSystem.paused)
  const active = useAppSelector(({ audioSystem }) => audioSystem.active)
  const favorites = useAppSelector(({ user }) => user.favoritesTracks)
  const albumResponse = useDeezerQuery<any>(`album/${id}`, {
    queryKey: 'album',
    options: {
      refetchOnWindowFocus: false,
    },
  })
  const currentTrack = active?.track
  const currentPlaylist: Playlists = {
    title: albumResponse.data?.title,
    excerpt: '',
    image: albumResponse.data?.cover,
    id: albumResponse.data?.id,
    tracks:
      albumResponse.data?.tracks?.data?.map(
        ({ title, preview, id, artist }: any) => ({
          title,
          src: preview,
          id,
          image: albumResponse.data.cover,
          artist: {
            id: artist.id,
            name: artist.name,
          },
        })
      ) || [],
  }

  function onAddTrackToFavorite(track: Track) {
    return () => {
      dispatch(
        toggleTrackToFavorite({
          id: nanoid(),
          track,
        })
      )
    }
  }

  function isFavorite(track: Track) {
    return Boolean(favorites.find((item) => item.track.id === track.id))
  }

  React.useEffect(() => {
    dispatch(setPlaylist(currentPlaylist?.tracks || []))
  }, [currentPlaylist])

  return (
    <div className="">
      <div className="w-full bg-base-100" style={{ height: '50vh' }}>
        <div
          className="w-full h-full absolute top-0 left-0 bg-cover bg-no-repeat bg-center flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${
              currentPlaylist.image ||
              'https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            })`,
          }}
        >
          <div
            className="w-full h-full absolute top-0 left-0 flex flex-col gap-3 content-center items-center justify-center"
            style={{ backgroundColor: `rgba(0, 0, 0, .75)` }}
          >
            {albumResponse.isLoading ? (
              <svg
                role="status"
                className="w-24 h-24 animate-spin fill-blue-600"
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
            ) : (
              <>
                <div>
                  <SimpleAudioPlay
                    paused={paused}
                    iconClassName="w-16 h-16 text-white"
                    track={currentPlaylist.tracks[0] ?? null}
                  />
                </div>
                <h3 className="text-3xl text-white">{currentPlaylist.title}</h3>
                <p className="text-sm text-white">
                  {currentPlaylist.tracks[0]?.artist.name}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex flex-col gap-4 justify-center">
          {currentPlaylist?.tracks?.map((item) => (
            <div
              className={cx(
                'bg-base-300 rounded shadow-lg grid grid-cols-[max-content,max-content,1fr,max-content]',
                {
                  'shadow-3xl': item.id === currentTrack?.id,
                }
              )}
              key={item.id}
            >
              <div className="p-3 bg-base-100 flex items-center justify-center">
                <SimpleAudioPlay track={item} />
              </div>
              <div className="p-3 flex bg-base-200 items-center justify-center">
                <img src={item.image} className="w-10 h-10 rounded" />
              </div>
              <div className="p-3 flex items-center">
                <div
                  className={cx({
                    'text-primary': item.id === currentTrack?.id,
                  })}
                >
                  <div className="text-lg">{item.title}</div>
                  <span className="block">{item.artist.name}</span>
                </div>
              </div>
              <div className="p-3 bg-base-100 flex items-center justify-center">
                <button onClick={onAddTrackToFavorite(item)}>
                  {isFavorite(item) ? (
                    <HeartIcon className="w-4 h-4" />
                  ) : (
                    <OutHeaderIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlaylistIdPage

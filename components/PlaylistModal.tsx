import { PlusIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'

import Modal from '@/components/Modal'
import { useAppSelector } from '@/store'
import { addTrackToPlaylist, createPlaylist } from '@/store/actions/user'
import { Playlists, Track } from '@/store/types'

export default function PlaylistModal({
  open,
  onClose,
  track,
}: PlaylistModalProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [state, setState] = React.useState({
    title: '',
    excerpt: '',
    image: '',
  })
  const playlists = useAppSelector(({ user }) => user.playlists)
  const userPlaylists = playlists.filter((item) => item.id < 0)
  const havePlaylists = Boolean(userPlaylists.length)

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setState((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  function onCreatePlaylist(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (!track) return

    const id = -Math.floor(Math.random() * 10 ** 6 + 1)

    dispatch(
      createPlaylist({
        ...state,
        id,
        tracks: [track],
      })
    )

    router.push(`/playlist/${id}`)
  }

  function onAddTrackToPlaylist(id: number, track?: Track | null) {
    return () => {
      if (!track) return

      dispatch(addTrackToPlaylist({ id, track }))
    }
  }

  return (
    <Modal
      title={
        !havePlaylists
          ? 'У вас еще нет плейлистов'
          : `У вас ${playlists.length} плейлистов`
      }
      open={open}
      onClose={onClose}
    >
      {!havePlaylists ? (
        <form className="grid grid-cols-1 gap-3">
          <div className="text-xl">Добавьте трек в новый плейлист</div>
          <input
            onChange={onChange}
            name="title"
            type="text"
            placeholder="Имя плейлиста"
            className="input input-bordered w-full"
          />
          <input
            onChange={onChange}
            type="text"
            name="excerpt"
            placeholder="Описание плейлиста"
            className="input input-bordered w-full"
          />
          <input
            onChange={onChange}
            type="text"
            name="image"
            placeholder="Изображение плейлиста"
            className="input input-bordered w-full"
          />
          <button className="btn" onClick={onCreatePlaylist}>
            Создать и добавить трек
          </button>
        </form>
      ) : (
        <div className="w-full mt-4 grid grid-cols-2 gap-3 h-full overflow-y-auto">
          {userPlaylists.map((item) => (
            <div
              className="relative grid grid-cols-[max-content,1fr,max-content] shadow-lg rounded overflow-hidden"
              key={item.id}
            >
              <Link href={`/playlist/${item.id}`}>
                <figure className="p-2 bg-base-300 cursor-pointer">
                  <img
                    className="w-10 h-10 rounded"
                    src={item.image}
                    alt={item.title}
                  />
                </figure>
              </Link>
              <div className="py-2 px-6 flex items-center bg-base-200">
                <h2 className="text-lg inline text-ellipsis overflow-hidden whitespace-nowrap">{`${item.title} (${item.tracks.length} треков)`}</h2>
              </div>
              <div className="bg-base-300 p-2">
                <button
                  disabled={item.tracks.some(
                    (itemTrack) => itemTrack.id === track?.id
                  )}
                  className="btn btn-primary"
                  onClick={onAddTrackToPlaylist(item.id, track)}
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}

export type PlaylistModalProps = {
  open: boolean
  onClose(): void
  track?: Track | null
  playlist?: Playlists | null
}

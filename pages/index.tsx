import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useQuery } from 'react-query'

import Tracklist from '@/components/Tracklist'
import { DeezerSearchApi } from '@/pages/api/hello'
import { useAppDispatch } from '@/store'
import { setPlaylist } from '@/store/actions/playlist'
import { Track } from '@/store/types'
import { deezerClient } from '@/utils/common/deezerClient'

function useSearchTracks(term: string) {
  const response = useQuery<DeezerSearchApi>(
    ['users', term],
    async ({ signal, queryKey }) => {
      const [, queryTerm] = queryKey

      try {
        const response = await deezerClient.get(`search?q=${queryTerm}`, {
          signal,
        })

        if (response.data.error) {
          return Promise.reject(response.data.error)
        }

        return response.data
      } catch (e) {
        return Promise.reject(e)
      }
    },
    {
      enabled: Boolean(term),
    }
  )
  const data = response.data?.data

  const playlist: Track[] =
    data?.map(({ title, preview, album, artist, id }) => ({
      id,
      src: preview,
      title,
      image: album.cover_big,
      artist: {
        name: artist.name,
        id: artist.id,
      },
      album: {
        id: album.id,
        image: album.cover_big,
        title: album.title,
      },
    })) || []
  const audioData =
    data?.map(({ title, id, preview, album, artist }, index) => ({
      title,
      id,
      preview,
      album,
      artist,
      track: playlist[index],
    })) || []

  return {
    response,
    playlist,
    audioData,
    data,
  }
}

const Home: NextPage = () => {
  const [query, setQuery] = React.useState<string>('')
  const [resQuery, setResQuery] = React.useState(query)
  const searchTracks = useSearchTracks(resQuery)
  const dispatch = useAppDispatch()

  function onRefetchTracks() {
    searchTracks.response.refetch()
  }

  function onChangeQuery({ target }: React.ChangeEvent<HTMLInputElement>) {
    setQuery(target.value)
  }

  function onFindTrack() {
    setResQuery(query)
  }

  React.useEffect(() => {
    if (searchTracks.data) {
      dispatch(
        setPlaylist({
          album: null,
          tracks: searchTracks.playlist,
        })
      )
    }
  }, [searchTracks.data])

  return (
    <div className="container  py-6">
      <div className="grid grid-cols-[1fr,max-content] gap-2 items-center w-full py-4">
        <input
          className="input input-lg w-full input-bordered rounded-tl-none rounded-bl-none border-base-300"
          placeholder="Найди трек или артиста"
          value={query}
          onChange={onChangeQuery}
        />
        <button className="btn btn-primary btn-lg" onClick={onFindTrack}>
          Найти
        </button>
      </div>

      <Tracklist
        tracklist={searchTracks.audioData}
        isLoading={searchTracks.response.isLoading}
        isError={searchTracks.response.isError}
        onRefetchTracks={onRefetchTracks}
      />
    </div>
  )
}

export default Home

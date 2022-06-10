import type { NextPage } from 'next'
import React from 'react'

import Tracklist from '@/components/Tracklist'
import { useDeezerQuery } from '@/hooks/useDeezerQuery'
import { DeezerSearchApi } from '@/pages/api/hello'
import { useAppDispatch } from '@/store'
import { setPlaylist } from '@/store/actions/playlist'
import { Track } from '@/store/types'

const Home: NextPage = () => {
  const [query, setQuery] = React.useState<string>('og buda')
  const [resQuery, setResQuery] = React.useState(query)
  const searchResponse = useDeezerQuery<DeezerSearchApi>(
    `search?q=${resQuery}`,
    {
      queryKey: ['users', resQuery],
      options: {
        refetchOnWindowFocus: false,
      },
    }
  )

  const playlist: Track[] =
    searchResponse.data?.data?.map(({ title, preview, album, artist, id }) => ({
      id,
      src: preview,
      title,
      image: album.cover_big,
      artist: {
        name: artist.name,
        id: artist.id,
      },
    })) || []
  const audioData =
    searchResponse.data?.data?.map(
      ({ title, id, preview, album, artist }, index) => ({
        title,
        id,
        preview,
        album,
        artist,
        track: playlist[index],
      })
    ) || []
  const dispatch = useAppDispatch()

  function onRefetchTracks() {
    searchResponse.refetch()
  }

  function onChangeQuery({ target }: React.ChangeEvent<HTMLInputElement>) {
    setQuery(target.value)
  }

  function onFindTrack() {
    setResQuery(query)
  }

  React.useEffect(() => {
    dispatch(setPlaylist(playlist))
  }, [searchResponse.data?.data])

  return (
    <div className="container  py-6">
      <h2 className="text-2xl">{`По вашему запросу 163onmyneck найдено ${
        playlist?.length || 0
      } аудиозаписей`}</h2>
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
        tracklist={audioData}
        isLoading={searchResponse.isLoading}
        isError={searchResponse.isError}
        onRefetchTracks={onRefetchTracks}
      />
    </div>
  )
}

export default Home

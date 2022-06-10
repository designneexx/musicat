import { HeartIcon as OutHeaderIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { nanoid } from '@reduxjs/toolkit'
import cx from 'classnames'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

import AudioPlaylist from '@/components/AudioPlaylist'
import SimpleAudioPlay from '@/components/SimpleAudioPlay'
import Tracklist from '@/components/Tracklist'
import { useDeezerQuery } from '@/hooks/useDeezerQuery'
import { useAppDispatch, useAppSelector } from '@/store'
import { setPlaylist } from '@/store/actions/playlist'
import { toggleTrackToFavorite } from '@/store/actions/user'
import { Playlists, Track } from '@/store/types'

function ArtistTracklist({ tracklistURL }: ArtistTracklistProps) {
  const [nextURL, setNextURL] = React.useState(tracklistURL)
  const [responseData, setResponseData] = React.useState<any>([])
  const response = useQuery(['tracklist', nextURL], async () => {
    const res = await fetch(nextURL)
    const data = await res.json()
    return data
  })
  const playlist: Track[] =
    responseData?.map(({ title, preview, album, artist, id }: any) => ({
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
    responseData?.map(
      ({ title, id, preview, album, artist }: any, index: any) => ({
        title,
        id,
        preview,
        album,
        artist,
        track: playlist[index],
      })
    ) || []

  function onRefetchTracks() {
    response.refetch()
  }

  function onMore() {
    if (response.data?.next) {
      setNextURL(response.data?.next)
    }
  }

  React.useEffect(() => {
    setNextURL(tracklistURL)
  }, [tracklistURL])

  return (
    <Tracklist
      tracklist={audioData}
      isError={response.isError}
      isLoading={response.isLoading}
      onRefetchTracks={onRefetchTracks}
      isMore={Boolean(response.data?.next)}
      onMore={onMore}
    />
  )
}

type ArtistTracklistProps = {
  tracklistURL: string
}

const ArtistIdPage: NextPage = () => {
  const router = useRouter()
  const query = router.query
  const id = Number(query.artistId)
  console.log(id, router, query)
  const artistResponse = useDeezerQuery<any>(`artist/${id}`, {
    queryKey: 'artist',
    options: {
      refetchOnWindowFocus: false,
    },
  })
  const artist = {
    image: artistResponse.data?.picture_xl,
    name: artistResponse.data?.name,
  }

  return (
    <div className="">
      <div className="w-full bg-base-100" style={{ height: '50vh' }}>
        <div
          className="w-full h-full absolute top-0 left-0 bg-cover bg-no-repeat bg-top flex items-center justify-center relative"
          style={{
            backgroundImage: `url(/black-wavy-glitch-effect-texture-background.jpg)`,
          }}
        >
          <div
            className="w-full h-full absolute top-0 left-0 flex flex-col gap-3 content-center items-center justify-center"
            style={{ backgroundColor: `rgba(0, 0, 0, .75)` }}
          >
            <div className="">
              <img src={artist.image} />
              <h3 className="text-3xl text-white">{artist.name}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-6">
        {artistResponse.data?.tracklist && (
          <ArtistTracklist tracklistURL={artistResponse.data?.tracklist} />
        )}
      </div>
    </div>
  )
}

export default ArtistIdPage

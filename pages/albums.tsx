import { EyeIcon, TrashIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { useAppSelector } from '@/store'

const AlbumsPage: NextPage = () => {
  const playlists = useAppSelector(({ user }) => user.playlists)
  const router = useRouter()

  return (
    <div className="container  py-6">
      <h2 className="text-xl mb-4">{`У вас ${playlists.length} плейлистов`}</h2>
      <div className="grid grid-cols-3 gap-4 rounded w-full">
        {playlists.map(({ id, title, image, tracks }) => (
          <div
            key={id}
            className="rounded relative card"
            style={{ height: '250px' }}
          >
            <figure className="w-full h-12 relative">
              <Image src={image} alt="" layout="fill" objectFit="contain" />
            </figure>
            <h3
              className="absolute font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl"
              style={{
                textShadow: `.1em .1em 0 hsl(200 50% 30%)`,
              }}
            >
              {title}
              <span className="text-sm block font-normal">{`Кол-во аудиозаписей: ${tracks.length}`}</span>
            </h3>

            <div className="absolute left-1/2 bottom-4 rounded bg-base-100 -translate-x-1/2">
              <button className="p-4 border-r border-base-300">
                <TrashIcon className="w-4 h-4" />
              </button>
              <button
                className="p-4"
                onClick={() => router.push(`/playlist/${id}`)}
              >
                <EyeIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumsPage

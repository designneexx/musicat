// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export type DeezerSearchApi = {
  data: {
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
  }[]
  next?: string
}

export type AlbumApi = {
  error: any
  cover: string
  title: string
  id: number
  tracks: {
    data: {
      id: number
      title: string
      preview: string
      cover: string
      artist: {
        id: number
        name: string
      }
    }[]
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

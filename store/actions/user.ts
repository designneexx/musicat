import { createAction } from '@reduxjs/toolkit'

import { Playlists, Track } from '@/store/types'

export const toggleTrackToFavorite = createAction<Track>(
  'user/addTrackToFavorite'
)

export const addTrackToPlaylist = createAction<Track>('user/addTrackToPlaylist')

export const addPlaylist = createAction<Playlists>('user/addPlaylist')

export const createPlaylist = createAction<Playlists>('user/createPlaylist')

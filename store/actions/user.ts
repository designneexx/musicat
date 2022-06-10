import { createAction } from '@reduxjs/toolkit'

import { FavoriteTrack, Playlists, Track } from '@/store/types'

export const toggleTrackToFavorite = createAction<FavoriteTrack>(
  'user/addTrackToFavorite'
)
export const addTrackToPlaylist = createAction<{ id: number; track: Track }>(
  'user/addTrackToPlaylist'
)
export const addPlaylist = createAction<Playlists>('user/addPlaylist')
export const createPlaylist = createAction<Playlists>('user/createPlaylist')

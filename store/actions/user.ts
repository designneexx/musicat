import { createAction } from '@reduxjs/toolkit'

import { ShortAlbum, Track, UserProfile } from '@/store/types'

export const toggleTrackToFavorite = createAction<Track>(
  'user/addTrackToFavorite'
)

export const addAlbum = createAction<ShortAlbum>('user/addPlaylist')

export const removeAlbum = createAction<number>('user/removeAlbum')

export const setProfile = createAction<UserProfile | null>('user/setProfile')

export const toggleAlbum = createAction<ShortAlbum>('user/toggleAlbum')

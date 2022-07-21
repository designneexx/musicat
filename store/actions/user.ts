import { createAction } from '@reduxjs/toolkit'

import { Album, Track, UserProfile } from '@/store/types'

export const toggleTrackToFavorite = createAction<Track>(
  'user/addTrackToFavorite'
)

export const addAlbum = createAction<Album>('user/addPlaylist')

export const removeAlbum = createAction<number>('user/removeAlbum')

export const setProfile = createAction<UserProfile | null>('user/setProfile')

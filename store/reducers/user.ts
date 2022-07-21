import { createReducer } from '@reduxjs/toolkit'

import {
  addAlbum,
  removeAlbum,
  setProfile,
  toggleTrackToFavorite,
} from '@/store/actions/user'
import { User } from '@/store/types'

const initialUser: User = {
  favoritesTracks: [],
  playlists: [],
  favoritesArtists: [],
  profile: null,
}

export const user = createReducer(initialUser, (builder) => {
  builder
    .addCase(toggleTrackToFavorite, (state, { payload }) => {
      const favoritesTracks = state.favoritesTracks

      const favoriteIndex = favoritesTracks.findIndex(
        ({ id }) => id === payload.id
      )

      if (favoriteIndex !== -1) {
        favoritesTracks.splice(favoriteIndex, 1)
      } else {
        favoritesTracks.push(payload)
      }
    })
    .addCase(addAlbum, (state, { payload }) => {
      state.playlists.push(payload)
    })
    .addCase(removeAlbum, (state, { payload }) => {
      const playlists = state.playlists

      const playlistIndex = playlists.findIndex((item) => item.id === payload)

      if (playlistIndex !== -1) {
        playlists.splice(playlistIndex, 1)
      }
    })
    .addCase(setProfile, (state, { payload }) => {
      state.profile = payload
    })
})

import { createReducer } from '@reduxjs/toolkit'

import { removePlaylist } from '@/store/actions/playlist'
import {
  addPlaylist,
  addTrackToPlaylist,
  createPlaylist,
  toggleTrackToFavorite,
} from '@/store/actions/user'
import { User } from '@/store/types'

const initialUser: User = {
  favoritesTracks: [],
  playlists: [],
  favoritesArtists: [],
}

export const user = createReducer(initialUser, (builder) => {
  builder
    .addCase(toggleTrackToFavorite, (state, { payload }) => {
      const favoriteIndex = state.favoritesTracks.findIndex(
        (item) => item.track.id === payload.track.id
      )

      if (favoriteIndex !== -1) {
        state.favoritesTracks.splice(favoriteIndex, 1)
      } else {
        state.favoritesTracks.push(payload)
      }
    })
    .addCase(createPlaylist, (state, { payload }) => {
      state.playlists.push(payload)
    })
    .addCase(addPlaylist, (state, { payload }) => {
      state.playlists.push(payload)
    })
    .addCase(removePlaylist, (state, { payload }) => {
      const playlistIndex = state.playlists.findIndex(
        (item) => item.id === payload
      )

      if (playlistIndex !== -1) {
        state.playlists.splice(playlistIndex, 1)
      }
    })
    .addCase(addTrackToPlaylist, (state, { payload }) => {
      const playlistIndex = state.playlists.findIndex(
        (item) => item.id === payload.id
      )

      if (playlistIndex !== -1) {
        state.playlists[playlistIndex].tracks.push(payload.track)
      }
    })
})

import { createReducer } from '@reduxjs/toolkit'

import { setPlaylist, shufflePlaylist } from '@/store/actions/playlist'
import { Playlist } from '@/store/types'

const playlistState: Playlist = {
  active: [],
}

export const playlist = createReducer(playlistState, (builder) => {
  builder
    .addCase(setPlaylist, (state, { payload }) => {
      state.active = payload
    })
    .addCase(shufflePlaylist.fulfilled, (state) => {
      const playlist = state.active

      for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = playlist[i]

        playlist[i] = playlist[j]
        playlist[j] = temp
      }

      state.active = playlist
    })
})

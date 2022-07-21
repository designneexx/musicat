import { createReducer } from '@reduxjs/toolkit'

import { setPlaylist, shufflePlaylist } from '@/store/actions/playlist'
import { Playlist } from '@/store/types'

const playlistState: Playlist = {
  active: {
    album: null,
    tracks: [],
  },
}

export const playlist = createReducer(playlistState, (builder) => {
  builder
    .addCase(setPlaylist, (state, { payload }) => {
      state.active = payload
    })
    .addCase(shufflePlaylist.fulfilled, (state) => {
      const playlist = state.active
      const tracks = playlist.tracks

      for (let i = tracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = tracks[i]

        tracks[i] = tracks[j]
        tracks[j] = temp
      }

      state.active = playlist
    })
})

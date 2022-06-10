import { createReducer } from '@reduxjs/toolkit'

import { setRootState } from '@/store/actions/app'
import { AppState } from '@/store/types'

const initialState: AppState = {
  data: {
    theme: {
      value: 'light',
    },
    audioSystem: {
      loop: false,
      muted: false,
      volume: 1,
      paused: true,
      active: null,
    },
    playlist: {
      active: [],
    },
    user: {
      favoritesTracks: [],
      playlists: [],
      favoritesArtists: [],
    },
  },
}

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(setRootState, (state, { payload }) => {
    state.data = payload
  })
})

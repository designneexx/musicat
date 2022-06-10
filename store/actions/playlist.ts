import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { setAudioItem } from '@/store/actions/audioSystem'
import { MusiCatStorage, Track } from '@/store/types'

export const setPlaylist = createAction<Track[]>('playlist/setPlayList')
export const shufflePlaylist = createAsyncThunk<void>(
  'playlist/shufflePlaylist',
  async (_item, thunkApi) => {
    const state = thunkApi.getState() as any

    const randomTrack =
      state.data.playlist.active[
        Math.floor(Math.random() * state.data.playlist.active.length)
      ]

    if (randomTrack) {
      thunkApi.dispatch(
        setAudioItem({
          isLoading: true,
          isLoaded: false,
          isError: false,
          track: randomTrack,
        })
      )
    }
  }
)
export const removePlaylist = createAction<number>('playlist/removePlaylist')

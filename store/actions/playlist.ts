import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { setAudioTrack } from '@/store/actions/audioSystem'
import { ActivePlaylist, MusiCatStorage } from '@/store/types'

export const setPlaylist = createAction<ActivePlaylist>('playlist/setPlayList')

export const shufflePlaylist = createAsyncThunk(
  'playlist/shufflePlaylist',
  async (_item, thunkApi) => {
    const {
      playlist: { active: activePlaylist },
    } = thunkApi.getState() as MusiCatStorage

    const randomTrack =
      activePlaylist.tracks[
        Math.floor(Math.random() * activePlaylist.tracks.length)
      ]

    if (randomTrack) {
      thunkApi.dispatch(setAudioTrack(randomTrack))
    }
  }
)

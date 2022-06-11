import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { setAudioTrack } from '@/store/actions/audioSystem'
import { MusiCatStorage, Track } from '@/store/types'

export const setPlaylist = createAction<Track[]>('playlist/setPlayList')

export const shufflePlaylist = createAsyncThunk(
  'playlist/shufflePlaylist',
  async (_item, thunkApi) => {
    const {
      playlist: { active: activePlaylist },
    } = thunkApi.getState() as MusiCatStorage

    const randomTrack =
      activePlaylist[Math.floor(Math.random() * activePlaylist.length)]

    if (randomTrack) {
      thunkApi.dispatch(setAudioTrack(randomTrack))
    }
  }
)

export const removePlaylist = createAction<number>('playlist/removePlaylist')

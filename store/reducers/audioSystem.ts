import { createReducer } from '@reduxjs/toolkit'

import {
  setAudioError,
  setAudioItem,
  setAudioLoaded,
  setAudioLoading,
  setAudioPaused,
  setAudioTrack,
  setAudioVolume,
  setNextAudioTrack,
  setPlayAudioTrack,
  setPreviousAudioTrack,
  toggleAudioLoop,
  toggleAudioMuted,
  toggleAudioPaused,
} from '@/store/actions/audioSystem'
import { AudioSystem } from '@/store/types'

const audioSystemState: AudioSystem = {
  loop: false,
  muted: false,
  volume: 1,
  paused: true,
  active: null,
}

export const audioSystem = createReducer(audioSystemState, (builder) => {
  builder
    .addCase(setAudioItem, (state, { payload }) => {
      state.active = payload
    })
    .addCase(toggleAudioLoop, (state) => {
      state.loop = !state.loop
    })
    .addCase(toggleAudioMuted, (state) => {
      state.muted = !state.muted
    })
    .addCase(setAudioVolume, (state, { payload }) => {
      state.volume = payload
    })
    .addCase(toggleAudioPaused, (state) => {
      state.paused = !state.paused
    })
    .addCase(setAudioPaused, (state, { payload }) => {
      state.paused = payload
    })
    .addCase(setAudioLoading, (state, { payload }) => {
      if (!state.active) return

      state.active = {
        ...state.active,
        isLoaded: false,
        isError: false,
        isLoading: payload,
      }
    })
    .addCase(setAudioLoaded, (state, { payload }) => {
      if (!state.active) return

      state.active = {
        ...state.active,
        isError: false,
        isLoading: false,
        isLoaded: payload,
      }
    })
    .addCase(setAudioError, (state, { payload }) => {
      if (!state.active) return

      state.active = {
        ...state.active,
        isLoading: false,
        isLoaded: false,
        isError: payload,
      }
    })
    .addCase(setAudioTrack, (state, { payload }) => {
      state.active = {
        isLoading: true,
        isLoaded: false,
        isError: false,
        track: payload,
      }
    })
    .addCase(
      setPlayAudioTrack,
      (state, { payload: { track, currentTrack, paused } }) => {
        if (track?.id === currentTrack.id) {
          state.paused = paused

          return
        }

        state.active = {
          isLoading: true,
          isLoaded: false,
          isError: false,
          track: currentTrack,
        }

        state.paused = false
      }
    )
    .addCase(
      setPreviousAudioTrack,
      (state, { payload: { playlist, track } }) => {
        const playlistIndex = playlist.findIndex(
          (item) => item.src === track?.src
        )
        const prevTrack = playlist[playlistIndex - 1]

        if (prevTrack) {
          state.active = {
            isLoading: true,
            isLoaded: false,
            isError: false,
            track: prevTrack,
          }
        }
      }
    )
    .addCase(setNextAudioTrack, (state, { payload: { playlist, track } }) => {
      const playlistIndex = playlist.findIndex(
        (item) => item.src === track?.src
      )
      const nextTrack = playlist[playlistIndex + 1]

      if (nextTrack) {
        state.active = {
          isLoading: true,
          isLoaded: false,
          isError: false,
          track: nextTrack,
        }
      }
    })
})

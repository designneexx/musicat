import { createAction } from '@reduxjs/toolkit'

import {
  AudioItem,
  SetPlayAudioTrack,
  SetSiblingAudioTrack,
  Track,
} from '@/store/types'

export const setAudioItem = createAction<AudioItem | null>(
  'audioSystem/setAudioItem'
)
export const toggleAudioMuted = createAction('audioSystem/toggleAudioMuted')

export const setAudioVolume = createAction<number>('audioSystem/setAudioVolume')

export const toggleAudioLoop = createAction('audioSystem/toggleAudioLoop')

export const toggleAudioPaused = createAction('audioSystem/toggleAudioPaused')

export const setAudioPaused = createAction<boolean>(
  'audioSystem/setAudioPaused'
)

export const setAudioLoading = createAction<boolean>(
  'audioSystem/setAudioSystem'
)

export const setAudioLoaded = createAction<boolean>(
  'audioSystem/setAudioLoaded'
)

export const setAudioError = createAction<boolean>('audioSystem/setAudioError')

export const setAudioTrack = createAction<Track>('audioSystem/setAudioTrack')

export const setPreviousAudioTrack = createAction<SetSiblingAudioTrack>(
  'audioSystem/setPreviousAudioTrack'
)

export const setNextAudioTrack = createAction<SetSiblingAudioTrack>(
  'audioSystem/setNextAudioTrack'
)

export const setPlayAudioTrack = createAction<SetPlayAudioTrack>(
  'audioSystem/setPlayAudioTrack'
)

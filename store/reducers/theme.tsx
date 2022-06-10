import { createAction, createReducer } from '@reduxjs/toolkit'

const defaultTheme = { value: 'light' }

const setUITheme = createAction<string>('theme/setUITheme')

export const theme = createReducer(defaultTheme, (builder) => {
  builder.addCase(setUITheme, (state, { payload }) => {
    state.value = payload
  })
})

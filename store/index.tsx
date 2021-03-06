import { combineReducers, configureStore } from '@reduxjs/toolkit'
import * as ReactRedux from 'react-redux'

import { audioSystem } from '@/store/reducers/audioSystem'
import { playlist } from '@/store/reducers/playlist'
import { theme } from '@/store/reducers/theme'
import { user } from '@/store/reducers/user'
import { AppState, MusiCatStorage } from '@/store/types'

export const store = configureStore({
  reducer: combineReducers({
    data: combineReducers({ theme, audioSystem, playlist, user }),
  }),
})

export function useAppSelector<TSelected = unknown>(
  selector: (state: MusiCatStorage) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  return ReactRedux.useSelector<AppState, TSelected>(
    ({ data }) => selector(data),
    equalityFn
  )
}

export function useAppDispatch() {
  return ReactRedux.useDispatch<any>()
}

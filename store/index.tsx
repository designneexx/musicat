import { combineReducers, configureStore } from '@reduxjs/toolkit'
import * as ReactRedux from 'react-redux'

import { audioSystem } from '@/store/reducers/audioSystem'
import { playlist } from '@/store/reducers/playlist'
import { user } from '@/store/reducers/user'
import { MusiCatStorage } from '@/store/types'

export const store = configureStore({
  reducer: combineReducers({
    audioSystem,
    playlist,
    user,
  }),
})

export function useAppSelector<TSelected = unknown>(
  selector: (state: MusiCatStorage) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  return ReactRedux.useSelector<MusiCatStorage, TSelected>(selector, equalityFn)
}

export function useAppDispatch() {
  return ReactRedux.useDispatch<typeof store.dispatch>()
}

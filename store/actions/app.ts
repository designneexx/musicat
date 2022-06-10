import { createAction } from '@reduxjs/toolkit'

import { MusiCatStorage } from '@/store/types'

export const setRootState = createAction<MusiCatStorage>('app/setRootState')

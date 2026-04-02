import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './slices/uiSlice'
import jobsReducer from './slices/jobsSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    jobs: jobsReducer,
  },
})


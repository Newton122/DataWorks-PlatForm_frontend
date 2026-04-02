import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isMobileMenuOpen: false,
    notifications: [],
    isLoading: false,
  },
  reducers: {
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setMobileMenuOpen, addNotification, removeNotification, setLoading } = uiSlice.actions
export default uiSlice.reducer


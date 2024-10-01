import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
  },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
    },
    clearNotification: (state) => {
      state.message = null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
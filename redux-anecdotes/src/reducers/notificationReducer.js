import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message
    },
    clearNotification: (state) => {
      state.message = null
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  console.log("setNotification:", message, time)
  return async dispatch => {
    dispatch(showNotification({ message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer
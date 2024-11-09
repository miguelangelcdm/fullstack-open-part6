/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext, useEffect } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return action.payload
    case 'clear':
      return null
    default:
      return state
  }
}

export const useContentValue = () => {
  const contentAndDispatch = useContext(NotificationContext)
  return contentAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const contentAndDispatch = useContext(NotificationContext)
  return contentAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'clear' })
      }, 5000) // 5 seconds
      return () => clearTimeout(timer) // Clear timeout if notification changes
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
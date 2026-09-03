import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import conversationsReducer from './conversationSlice.js'

export default configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationsReducer,
  },
})
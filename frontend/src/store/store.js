import {configureStore} from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import chatSlice from './Slices/chatSlice'

const store = configureStore({
  reducer:{
     user:userSlice,
     chat:chatSlice,
  }
})

export default store
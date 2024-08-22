import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState:{
    user:null,
    isloading:true,
    isauthenticated:false,
  },
  reducers:{
    setauthenticated:(state,action)=>{
      state.isauthenticated = action.payload
    },
    setuser:(state,action)=>{
      state.user = action.payload
    },
    setloading:(state,action)=>{
      state.isloading = action.payload
    }
  }
})

export const {setauthenticated,setuser,setloading} = userSlice.actions
export default userSlice.reducer
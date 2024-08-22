import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    oponent: null,
    isConnected: false,
    conversation: null,
    activeUsers: [],
    allconversations: [],
    toggle: 1 // Initial value set to false
  },
  reducers: {
    setChatopen: (state, action) => {
      state.chatopen = action.payload;
    },
    setisConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setOponent: (state, action) => {
      state.oponent = action.payload;
    },
    setconversation: (state, action) => {
      state.conversation = action.payload;
    },
    setactiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    setallconversations: (state, action) => {
      state.allconversations = action.payload;
    },
    settoggle: (state,action) => {
      state.toggle = state.toggle+1;
    }
  }
});

export const { setChatopen, setisConnected, settoggle, setallconversations, setOponent, setconversation, setactiveUsers } = chatSlice.actions;

export default chatSlice.reducer;

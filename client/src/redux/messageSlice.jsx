import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    userMessages: [] ,
    conversations: []
  },
  reducers: {
    setuserMessages: (state, action) => {
      state.userMessages = action.payload;
    },
    clearUserMessages: (state) => {
      state.userMessages = []; // Clears the message array
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
  },
});

export const { setuserMessages, clearUserMessages,setConversations } = messageSlice.actions;

export default messageSlice.reducer;

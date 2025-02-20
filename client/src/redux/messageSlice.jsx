import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    userMessages: [],
    conversations: [],
  },
  reducers: {
    // Sets the entire messages array (useful for fetching messages initially)
    setUserMessages: (state, action) => {
      state.userMessages = action.payload;
    },

    // Adds a new message to the existing array instead of replacing it
    addUserMessage: (state, action) => {
      state.userMessages = [...state.userMessages, action.payload];
    },

    // Clears all messages (useful when logging out or switching conversations)
    clearUserMessages: (state) => {
      state.userMessages = [];
    },

    // Sets the user's conversation list
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
  },
});

export const {
  setUserMessages,
  addUserMessage,
  clearUserMessages,
  setConversations,
} = messageSlice.actions;

export default messageSlice.reducer;

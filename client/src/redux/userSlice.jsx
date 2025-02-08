import { createSlice } from "@reduxjs/toolkit";
const authUser = JSON.parse(localStorage.getItem("authUser"));
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: authUser ? true : false,
    authUser: authUser ? authUser : null,
    selectedUser: null,
    otherUsers: [],
    onlineUsers: null,
  },
  reducers: {
    setauthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setselectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setotherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setonlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setlogIn: (state,action) => {
      state.isLogin = action.payload;
    },
    logOutPannel: (state) => {
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setlogIn,
  logOutPannel,
  setauthUser,
  setselectedUser,
  setonlineUsers,
  setotherUsers,
} = userSlice.actions;

export default userSlice.reducer;

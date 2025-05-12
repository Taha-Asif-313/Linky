import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import messageSlice from "./messageSlice";
export default configureStore({
  reducer: {
    user: userSlice,
    message: messageSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../Slice/AuthSlice";



export const store = configureStore({
  reducer: {
    user: userSlice.reducer ,
  },
});



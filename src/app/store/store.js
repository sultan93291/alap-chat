import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../Slice/AuthSlice";
import {msgReciverSlice} from "../Slice/msgReciverSlice"





export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    msgReciverInfo: msgReciverSlice.reducer
  },
});



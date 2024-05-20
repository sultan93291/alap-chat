import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: typeof window !== 'undefined' && localStorage.getItem("loggedinUser")
    ? JSON.parse(localStorage.getItem("loggedinUser"))
    : null,
};

export const userSlice = createSlice({
  name: "loggedInUserInfo",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loggedInUser } = userSlice.actions;

export default userSlice.reducer;

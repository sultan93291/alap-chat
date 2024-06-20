import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const msgReciverSlice = createSlice({
  name: "msgReciverInfo",
  initialState,
  reducers: {
    msgReciver: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { msgReciver } = msgReciverSlice.actions;

export default msgReciverSlice.reducer;

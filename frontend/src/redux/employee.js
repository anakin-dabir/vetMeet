import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: "User",

  initialState,

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;

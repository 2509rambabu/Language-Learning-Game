//it serves as state of the website through all the pages
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      // console.log(state.mode)
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log(state.user)
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    }
  },
});

export const { setMode, setLogin, setLogout} =
  authSlice.actions;
export default authSlice.reducer;

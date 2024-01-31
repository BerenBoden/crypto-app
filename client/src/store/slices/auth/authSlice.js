import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const user = cookies.get("user");
const token = cookies.get("token");

const initialState = {
  isAuthenticated: false,
  user: user ? user : null,
  token: token ? token : null,
  admin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.admin = action.payload.admin;
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.admin = false;
    },
  },
});
export const { setAuthenticated, setUnauthenticated } = authSlice.actions;
export default authSlice.reducer;

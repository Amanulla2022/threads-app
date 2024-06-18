import { createSlice } from "@reduxjs/toolkit"; // importing createSlice from RTK

// intital state
const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
};
// creating a slice of state called auth for authentication
const authSlice = createSlice({
  name: "auth", // slice name
  initialState,
  reducers: {
    // reducer function for handling login action
    login: (state, action) => {
      state.isAuthenticated = true; // updating isAuthenticated to true when login
      state.user = action.payload;
    },
    // reducer function for handling logout action
    logout: (state) => {
      state.isAuthenticated = false; // updating isAuthenticated to false when logout
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

// exporting actions created by createSlice
export const { login, logout } = authSlice.actions;

// exporting reducer function created by createSlice
export default authSlice.reducer;

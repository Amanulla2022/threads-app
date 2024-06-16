import { createSlice } from "@reduxjs/toolkit"; // importing createSlice from RTK

// creating a slice of state called auth for authentication
const authSlice = createSlice({
  name: "auth", // slice name
  initialState: {
    isAuthenticated: false, // initially isAuthenticated is false
  },
  reducers: {
    // reducer function for handling login action
    login: (state) => {
      state.isAuthenticated = true; // updating isAuthenticated to true when login
    },
    // reducer function for handling logout action
    logout: (state) => {
      state.isAuthenticated = false; // updating isAuthenticated to false when logout
    },
  },
});

// exporting actions created by createSlice
export const { login, logout } = authSlice.actions;

// exporting reducer function created by createSlice
export default authSlice.reducer;

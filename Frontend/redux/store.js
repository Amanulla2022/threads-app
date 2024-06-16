import { configureStore } from "@reduxjs/toolkit"; // importing configureStore from RTK
import authReducer from "./authSlice"; // imorting authReducer from authSlice.js

// configuring the redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Including authReducer under the 'auth' key in the Redux store
  },
});

// exporting the configured Redux store
export default store;

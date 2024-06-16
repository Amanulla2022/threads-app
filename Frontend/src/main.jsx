// necessary things importing
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./../redux/store";
import { Provider } from "react-redux";

// Creating a root for ReactDOM at the #root element in index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the App component wrapped in Redux Provider to provide the Redux store
root.render(
  // Wraps the entire application with Redux Provider to provide the Redux store
  // This allows components in the application to access the Redux store and its state
  <Provider store={store}>
    <App />
  </Provider>
);

// necessary things importing
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Login from "./components/signup_login/Login";
import SignUp from "./components/signup_login/SignUp";
import Create from "./pages/Create";
import User from "./pages/User";
import EditUser from "./pages/EditUser";

const Layout = () => {
  const location = useLocation();

  const hideHeaderPaths = ["/login", "/signup"]; // Array of paths where the header component should be hidden
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname); // check if the header component should be hidden based on the current path
  return (
    <>
      {/* Conditionally render Header based on current path */}
      {!shouldHideHeader && <Header />}
      <Routes>
        {/* routes using React Router */}
        <Route path="/" element={<Home />} /> {/* home */}
        <Route path="/login" element={<Login />} /> {/* login */}
        <Route path="/signup" element={<SignUp />} /> {/* signup */}
        <Route path="/edit-profile" element={<EditUser />} />
        {/* edit profile */}
        <Route path="/create" element={<Create />} /> {/* create post*/}
        <Route path="/user" element={<User />} /> {/* user profile*/}
      </Routes>
    </>
  );
};

export default Layout;

// importing necessary things
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaThreads } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { CiSearch, CiHeart, CiUser } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch(); // redux hook to dispatch actions
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // selecting isAuthenticated from Redux state

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatching logout action from authSlice
    toast.success("Logout successful!", { autoClose: 5000 }); // showing success toast notification
  };

  return (
    // ui of header
    <header className=" flex justify-around cursor-pointer mt-4 items-center">
      <FaThreads className="icons thread-icon hover:translate-x-1 " />
      <nav className=" gap-8 cursor-pointer hidden sm:flex">
        <Link to="/">
          <GoHome className="icons icons-hover" />
        </Link>
        <Link to="/search">
          <CiSearch className="icons icons-hover" />
        </Link>
        <IoCreateOutline className="icons icons-hover" />
        <CiHeart className="icons icons-hover" />
        <CiUser className="icons icons-hover" />
      </nav>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="bg-red-400 text-white px-4 py-1 rounded-xl"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="bg-black text-white px-4 py-1 rounded-xl">
            Login
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;

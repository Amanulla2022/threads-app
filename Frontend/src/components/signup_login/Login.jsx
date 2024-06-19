// importing necessary things
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../images/bg-threads.avif";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";

const Login = () => {
  // initially sets all fields to empty strings
  const [inputs, setInputs] = useState({
    emailORusename: "",
    password: "",
  });

  const dispatch = useDispatch(); // initializing useDispatch hook
  const navigate = useNavigate(); // initializing useNavigate hook for navigation

  // Function to handle input changes
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs), // sending input data as JSON
      });
      const data = await response.json(); // parsing response data
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);
        console.log("User logged in:", data);
        dispatch(
          login({
            _id: data._id,
            name: data.name,
            username: data.username,
            email: data.email,
            bio: data.bio,
          })
        ); // dispatch login action
        toast.success("Login successful", { autoClose: 5000 }); // showing success toast notification
        setTimeout(() => {
          navigate("/user"); // navigating to home page after successful login
        }, 1000);
      } else {
        console.log("Error:", data.message);
        toast.error(data.message, { autoClose: 10000 }); // showing error toast notification
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.", { autoClose: 10000 }); // showing error toast notification
    }
  };
  return (
    // ui of login
    <div
      className="login_div"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.75,
      }}
    >
      <h2 className="login_header">Login in with username or email</h2>
      <div className="bg-gray-100 p-6 rounded-md shadow-lg w-2/3 sm:w-1/3">
        <form className="space-y-4">
          <input
            id="emailORusename"
            type="text"
            placeholder="Username or Email"
            className="login_input"
            aria-label="Username or Email"
            value={inputs.emailORusename}
            onChange={handleChange}
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="login_input "
            aria-label="Password"
            value={inputs.password}
            onChange={handleChange}
          />

          <button className="login_button" type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link className="text-red-500 hover:underline" to="/signup">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

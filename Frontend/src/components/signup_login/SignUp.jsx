// importing necessary things
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../images/bg-threads.avif";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../config";

const SignUp = () => {
  // initially sets all fields to empty strings
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // initializing useNavigate hook for navigation

  // Function to handle input changes
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  // Function to handle signup submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!inputs.name || !inputs.username || !inputs.email || !inputs.password) {
      toast.error("Please fill in all fields", { autoClose: 5000 });
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs), // sending input data as JSON
      });
      const data = await response.json(); // parsing response data
      if (response.ok) {
        console.log("User signed up:", data);
        toast.success("Signup successful", { autoClose: 5000 }); // showing success toast notification
        setTimeout(() => {
          navigate("/login"); // navigating to login page after successful signup
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
    // ui of signup
    <div
      className="login_div"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.75,
      }}
    >
      <h2 className="login_header">Create Your Thread Account</h2>
      <div className="bg-gray-100 p-6 rounded-md shadow-lg w-2/3 sm:w-1/3">
        <form className="space-y-4">
          <input
            id="name"
            type="text"
            placeholder="Full name"
            className="login_input"
            aria-label="Full name"
            value={inputs.name}
            onChange={handleChange}
          />
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="login_input"
            aria-label="Username"
            value={inputs.username}
            onChange={handleChange}
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="login_input"
            aria-label="Email"
            value={inputs.email}
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

          <button className="login_button" type="submit" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-green-500 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

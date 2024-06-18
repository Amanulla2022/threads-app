// import necessary things
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import UserInfo from "./UserInfo";

const Profile = () => {
  const { user } = useSelector((state) => state.auth); // Get the user from the Redux store
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Fetch user data when the component mounts or when the user changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${user._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [user]); // dependency of user

  // Function to format date
  function formatDate(dateString) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${dayOfWeek}, ${year}-${month}-${day}`;
  }

  // Function to handle edit profile button click
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    // ui for user profile
    <>
      {userData ? (
        <div className="relative">
          <UserInfo
            userData={userData}
            formatDate={formatDate}
            handleEditProfile={handleEditProfile}
          />
          <Link to="/create">
            <button className="text-green-100 bg-black absolute bottom-4 right-4 text-6xl p-2 rounded-full">
              <FaPlus />
            </button>
          </Link>
        </div>
      ) : (
        <p className="font-bold text-blue-300">
          Welcome to Threads Social Media App. Please sign in.
        </p>
      )}
    </>
  );
};

export default Profile;

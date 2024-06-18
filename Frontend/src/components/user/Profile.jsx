import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaThreads, FaInstagram } from "react-icons/fa6";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

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
          toast.error(data.message, { autoClose: 5000 });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [user]);

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
  return (
    <>
      {userData ? (
        <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg md:mx-40 mx-4 pb-40 pt-10 relative">
          <div className="user-div justify-between w-2/3 mb-4">
            <div className="cursor-pointer border-2 p-2 border-green-200 rounded-lg">
              <p className="font-bold hover:underline">{userData.name}</p>
              <p className="text-gray-500 hover:underline">
                @{userData.username}
              </p>
            </div>
            <img
              src={userData.profilepic}
              className="w-20 h-20 rounded-full mr-4 hover:bg-gray-500 border-2 border-red-200 cursor-pointer"
              alt="Profile"
            />
          </div>
          <div className="user-div w-3/4 mb-4">
            <p className="text-sm">{userData.bio}</p>
            <p className="small-text">{userData.email}</p>
          </div>

          <div className="user-div justify-around">
            <p className="follow">Followers: {userData.followers}</p>
            <p className="follow">Following: {userData.following}</p>
          </div>
          <div className="user-div justify-start">
            <p className="small-text ">
              Joined Threads On:{" "}
              <span className="text-teal-600">
                {formatDate(userData.createdAt)}
              </span>
            </p>
          </div>
          <div className="user-div justify-end cursor-pointer">
            <FaThreads className="icons" />
            <FaInstagram className="icons" />
          </div>
          <button className="login_button absolute bottom-4 left-4 w-32 hover:">
            Edit Profile
          </button>
        </div>
      ) : (
        <p className="font-bold text-blue-300">
          Welcome to Threads Socila media app Sign in Please...
        </p>
      )}
    </>
  );
};

export default Profile;

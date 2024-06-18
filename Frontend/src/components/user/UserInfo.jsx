// import necessary things
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import UserPosts from "./UserPosts";

// Getting props from Profile Parent component where userData, formatDate and handleEditProfile are defined
const UserInfo = ({ userData, formatDate, handleEditProfile }) => {
  return (
    // Main container for user information
    <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg md:mx-40 mx-4 pb-40 pt-10 relative">
      <div className="user-div justify-between w-2/3 mb-4">
        <div className="cursor-pointer border-2 p-2 border-green-200 rounded-lg">
          <p className="font-bold hover:underline">{userData.name}</p>
          <p className="text-gray-500 hover:underline">@{userData.username}</p>
          <p className="small-text">{userData.email}</p>
        </div>
        <img
          src={userData.profilePic}
          className="w-20 h-20 rounded-full mr-4 hover:bg-gray-500 border-2 border-red-200 cursor-pointer"
          alt="Profile"
        />
      </div>
      <div className="user-div flex-col w-3/4 mb-4 border-2 p-2">
        <h2 className="text-2xl font-bold underline ">Bio</h2>
        <p className="text-sm">{userData.bio}</p>
      </div>
      <div className="user-div justify-around">
        <p className="follow">Followers: {userData.followers}</p>
        <p className="follow">Following: {userData.following}</p>
      </div>
      <div className="user-div justify-start">
        <p className="small-text">
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
      <button
        className="login_button absolute bottom-4 left-4 w-32"
        onClick={handleEditProfile}
      >
        Edit Profile
      </button>
      <UserPosts userId={userData._id} />
    </div>
  );
};

export default UserInfo;

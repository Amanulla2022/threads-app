import React, { useEffect, useState } from "react";
import UserForm from "../components/user/UserForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const { user } = useSelector((state) => state.auth); // get user from Redux state
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePic: "",
  }); // Initializing form data state with empty values
  const navigate = useNavigate(); // Initializing the navigate function from react-router-dom

  // Fetch the user's data from the backend when the component mounts or when the user changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${user._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [user]); // dependency array

  // Update the form data state when form fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/user");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // ui of edit user page
    <div className="flex flex-col items-center bg-gray-100 rounded-lg md:mx-40 mx-4 pb-40 pt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <UserForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
export default EditUser;

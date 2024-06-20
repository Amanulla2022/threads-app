import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const AddPost = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/posts/create`,
        { description, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message);
      setDescription("");
      setImage(null);
      navigate("/");
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col m-4">
      <h2 className="font-bold text-2xl underline mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <textarea
            className="border-2 w-full h-20 rounded-xl"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Start threads..."
            maxLength="400"
            required
          />
        </div>
        <div className="flex gap-8 ">
          <label>Image: </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="login_button">
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPost;

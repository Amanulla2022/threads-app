import React, { useState } from "react";

const AddPost = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-6"
    >
      <textarea
        className="border-2 rounded-xl h-24 w-2/3 resize-none"
        type="text"
        placeholder="Start to threads..."
        value={description}
        onChange={handleDescriptionChange}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit" className="login_button w-48">
        Create Post
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddPost;

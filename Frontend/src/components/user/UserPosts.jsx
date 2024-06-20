import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../config";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]); // State to store the user's posts
  const [selectedPost, setSelectedPost] = useState(null); // State to manage the selected post for update
  const { user } = useSelector((state) => state.auth); // get user from Redux state
  // Fetch the user's posts from the backend when the component mounts or when the user changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${user._id}/posts`
        );
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [userId]);

  // Function to delete a post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== postId));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  // Toggle the dropdown
  const toggleDropdown = (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null); // Close the dropdown if it's already open
    } else {
      setSelectedPost(postId); // Open the dropdown for the selected post
    }
  };

  return (
    <div className="container mx-auto p-4">
      {posts.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">
            No posts yet. Create a post to share your thoughts!
          </p>
          <p className="text-gray-600">
            Click the plus icon to create a post....
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">My Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border rounded-lg p-4 relative shadow-lg bg-white"
              >
                <p className="text-gray-800">{post.description}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-36 h-36 mt-2 rounded-md"
                  />
                )}
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <button
                    onClick={() => toggleDropdown(post._id)}
                    className="text-gray-500 hover:text-gray-800 focus:outline-none"
                  >
                    &#x2022;&#x2022;&#x2022;
                  </button>
                  {selectedPost === post._id && (
                    <div className="absolute bg-white border rounded shadow-lg mt-2 right-0">
                      <button
                        onClick={() => deletePost(post._id)}
                        className="login_button"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPosts;

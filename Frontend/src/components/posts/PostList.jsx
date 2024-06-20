import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";
import { PiShareFatThin } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { API_BASE_URL } from "../../config";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/posts/`);
        setPosts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      console.log(postId);
      const response = await axios.put(
        `http://localhost:8000/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedLikes = response.data.likes.length;
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: updatedLikes };
          } else {
            return post;
          }
        });
      });
    } catch (error) {
      console.error("Error liking the post:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex justify-center items-center flex-col gap-6 m-4 w-full">
      {posts.map((post) => (
        <div key={post._id} className="flex w-full max-w-2xl">
          <div style={{ flex: "1/5" }}>
            {post.postedBy && post.postedBy.profilePic ? (
              <img
                src={post.postedBy.profilePic}
                alt="user icon"
                className="w-12 h-12 rounded-full mr-4 border-2"
              />
            ) : (
              <div className="w-12 h-12 rounded-full mr-4 border-2 bg-gray-300"></div> // Placeholder for missing profilePic
            )}
          </div>
          <div style={{ flex: "4/5" }} className="w-full">
            <div className="flex gap-2">
              <h2 className="font-bold underline cursor-pointer">
                {post.postedBy ? post.postedBy.name : "Unknown User"}
              </h2>
              <span>{formatDistanceToNow(new Date(post.createdAt))}</span>
            </div>
            <div className="mb-4">
              <h2>{post.description}</h2>
              {post.image && (
                <img
                  src={post.image}
                  alt="post image"
                  className="h-48 w-auto"
                />
              )}
            </div>
            <div className="flex gap-4 justify-start items-center">
              <div
                onClick={() => handleLike(post._id)}
                className="cursor-pointer relative"
              >
                <CiHeart className="posts-icons" />
                <span className="absolute top-3 -right-1  text-pink-600 rounded-full p-0.5 text-sm">
                  {post.likes ? post.likes.length : ""}
                </span>
              </div>
              <TfiCommentsSmiley className="posts-icons" />
              <BiRepost className="posts-icons" />
              <PiShareFatThin className="posts-icons" />
            </div>
            <hr className="my-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;

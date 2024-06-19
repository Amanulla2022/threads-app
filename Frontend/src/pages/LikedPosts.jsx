import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";
import { PiShareFatThin } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

const LikedPosts = () => {
  const { user } = useSelector((state) => state.auth); // get user from Redux state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/users/liked/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPosts();
  }, [user._id]);

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
              <CiHeart />
              <span>{post.likes ? post.likes.length : ""}</span>
              <TfiCommentsSmiley className="posts-icons" />
              <BiRepost className="posts-icons" />
              <PiShareFatThin className="posts-icons" />
            </div>
            <hr className="my-4" />
          </div>
        </div>
      ))}
      {posts.length === 0 && <p>Please login and like posts</p>}
    </div>
  );
};

export default LikedPosts;

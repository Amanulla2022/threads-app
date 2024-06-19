import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { BiRepost } from "react-icons/bi";
import { PiShareFatThin } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";

const LikedPosts = () => {
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(userId);
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/users/liked/${userId}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(userId);
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPosts();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center items-center flex-col gap-6 m-4 w-full">
      {posts.map((post) => (
        <div key={post._id} className="flex w-full max-w-2xl">
          <div style={{ flex: "1/5" }}>
            <img
              src={post.postedBy.profilePic}
              alt="user icon"
              className="w-6 h-6 rounded-full"
            />
          </div>
          <div style={{ flex: "4/5" }} className="w-full">
            <div className="flex gap-2">
              <h2 className="font-bold underline cursor-pointer">
                {post.postedBy.name}
              </h2>
              <span>{formatDistanceToNow(new Date(post.createdAt))}</span>
            </div>
            <div className="mb-4">
              <h2>{post.description}</h2>
              {post.image && <img src={post.image} alt="post image" />}
            </div>
            <div className="flex gap-4 justify-start items-center">
              <CiHeart />
              <span>{post.likes.length}</span>

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

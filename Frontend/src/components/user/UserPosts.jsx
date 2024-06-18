import React, { useEffect, useState } from "react"; // importing

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]); // State to store the user's posts

  // Fetch the user's posts from the backend when the component mounts or when the user changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/users/${userId}/posts`
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

  // Render the user's posts
  return (
    <>
      {/* If user has no posts */}
      {posts.length === 0 ? (
        <>
          <p>No posts yet. Create a post to share your thoughts! </p>
          <p>Click plus icon to create a post....</p>
        </>
      ) : (
        // If user has posts, displaying them in a grid
        <>
          <h2>My Posts</h2>
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post._id} className="border-2 p-4 rounded-lg">
                <p>{post.description}</p>
                {post.image && (
                  <img src={post.image} alt="Post" className="w-full mt-2" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UserPosts;

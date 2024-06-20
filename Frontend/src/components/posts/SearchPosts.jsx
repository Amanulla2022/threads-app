import React, { useState } from "react";
import axios from "axios";

const SearchPosts = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/search?query=${query}`
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col m-4">
      <div className="flex justify-center items-center flex-col w-3/5 m-4 gap-8">
        <textarea
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users based on name, username, or email..."
          className="border-2 w-full h-20 rounded-xl"
        />
        <button className="login_button" onClick={searchUsers}>
          Search
        </button>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Profile Pic</th>
              <th className="px-4 py-2">Followers</th>
              <th className="px-4 py-2">Following</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  {user.profilePic && (
                    <img
                      src={user.profilePic}
                      alt="Profile Pic"
                      className="rounded-full h-10 w-10"
                    />
                  )}
                </td>
                <td className="border px-4 py-2">{user.followers.length}</td>
                <td className="border px-4 py-2">{user.following.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchPosts;

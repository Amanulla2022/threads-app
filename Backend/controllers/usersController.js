import bcrypt from "bcryptjs";
import User from "./../models/usersModel.js";
import jwt from "jsonwebtoken";
import Post from "./../models/postModel.js";

// after logout store those tokens here
let invalidatedTokens = [];
// Signup function
const signUpUser = async (req, res) => {
  try {
    // extracting name, username, email and password from request body
    const { name, username, email, password } = req.body;

    // checking user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hasing the password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user instance
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    // save new user in DB
    await newUser.save();

    // response with new user information
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    // handling errors
    res.status(500).json({ message: error.message });
  }
};

// login function
const loginUser = async (req, res) => {
  try {
    // extracting email or username and password
    const { emailORusename, password } = req.body;

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: emailORusename }, { username: emailORusename }],
    });

    // If user does not exist, return error
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If passwords do not match, return error
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate jwt token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with user's ID, name, and the generated token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    // handling error
    res.status(500).json({ message: error.message });
  }
};

// logout function
const logoutUser = async (req, res) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token exists and add it to invalidatedTokens
    if (token) {
      invalidatedTokens.push(token);
    }
    // success message
    res.status(200).json({ message: "Token invalidated" });
  } catch (error) {
    // handling error
    res.status(500).json({ message: error.message });
  }
};

// get user by id function
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user details function
const updateUser = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { id } = req.params;

    // Extract the data to be updated from request body
    const { name, username, email, password, profilePic, bio } = req.body;

    // update the data
    let updateData = { name, username, email, profilePic, bio };

    // if password update hash it and store
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // find user and update
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // if not find user
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate image format
    if (
      profilePic &&
      !/^data:image\/(jpeg|png|gif|bmp);base64,/.test(profilePic)
    ) {
      return res.status(400).json({
        message: "Invalid image format. Should be Base64 encoded string.",
      });
    }

    // json user data display
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

// get all post by user function
const getAllPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ postedBy: userId }).populate(
      "postedBy",
      "name profilePic"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all likes posts
const likedPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    // Find posts where the likes array contains the userId
    const likedPosts = await Post.find({ likes: userId }).populate(
      "postedBy",
      "name profilePic"
    );
    // If no posts are liked by the user
    if (!likedPosts.length) {
      return res
        .status(404)
        .json({ message: "No liked posts found for this user" });
    }

    res.status(200).json(likedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// search Users
const searchUser = async (req, res) => {
  const query = req.query.query;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export {
  signUpUser,
  loginUser,
  logoutUser,
  invalidatedTokens,
  getById,
  updateUser,
  getAllPostsByUser,
  likedPosts,
  searchUser,
};

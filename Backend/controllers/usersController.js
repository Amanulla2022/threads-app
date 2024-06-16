import bcrypt from "bcryptjs";
import User from "./../models/usersModel.js";
import jwt from "jsonwebtoken";

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

export { signUpUser, loginUser, logoutUser, invalidatedTokens };

import bcrypt from "bcryptjs";
import User from "./../models/usersModel.js";
import jwt from "jsonwebtoken";

// Signup function
const signUpUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`error in signupuser ${error.message}`);
  }
};

// login function
const loginUser = async (req, res) => {
  try {
    const { emailORusename, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailORusename }, { username: emailORusename }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`error in signupuser ${error.message}`);
  }
};

// logout function
const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "User logged out successfully", token: "" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`error in signupuser ${error.message}`);
  }
};

export { signUpUser, loginUser, logoutUser };

import express from "express";
import {
  getAllPostsByUser,
  getById,
  likedPosts,
  loginUser,
  logoutUser,
  searchUser,
  signUpUser,
  updateUser,
} from "../controllers/usersController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", searchUser);
// Route to signup first time  POST/ api/users/signup
router.post("/signup", signUpUser);

// Route to login  POST/ api/users/login
router.post("/login", loginUser);

// Route to logout  POST/ api/users/logout
router.post("/logout", auth, logoutUser);

// Route to get user by id GET/ api/users/:id
router.get("/:id", getById);

// Route to update user route PUT/ api/users/:id
router.put("/:id", updateUser);

router.get("/:id/posts", getAllPostsByUser);

// Route to get liked posts by user
router.get("/liked/:id", auth, likedPosts);

export default router;

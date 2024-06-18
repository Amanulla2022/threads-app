import express from "express";
import {
  getById,
  loginUser,
  logoutUser,
  signUpUser,
} from "../controllers/usersController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to signup first time  POST/ api/users/signup
router.post("/signup", signUpUser);

// Route to login  POST/ api/users/login
router.post("/login", loginUser);

// Route to logout  POST/ api/users/logout
router.post("/logout", auth, logoutUser);

router.get("/:id", getById);

export default router;

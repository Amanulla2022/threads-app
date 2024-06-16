import express from "express";
import {
  createPost,
  deletePostById,
  getPostById,
  updatePostById,
} from "../controllers/postController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new post POST/ api/posts/create
router.post("/create", auth, createPost);

// Route to get a post by its ID GET/ api/posts/:id
router.get("/:id", getPostById);

// Route to delete a post by its ID DELETE/ api/posts/:id
router.delete("/:id", auth, deletePostById);

// Route to update a post by its ID PUT/ api/posts/:id
router.put("/:id", auth, updatePostById);
export default router;

import Post from "../models/postModel.js";
import User from "../models/usersModel.js";

// function to create post
const createPost = async (req, res) => {
  try {
    // extracting desc and image from request body
    const { description, image } = req.body;

    // checking if description is provided and validating user
    if (!req.user || !description) {
      return res
        .status(400)
        .json({ message: "User and description of post are required" });
    }

    // finding user by id
    const user = await User.findById(req.user._id);

    // user exist or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // checking if user has authorization or not
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to create post" });
    }

    const maxLength = 400;
    // checking whether description exceeding the maxm length
    if (description.length > maxLength) {
      return res.status(400).json({
        message: `Description of post should be less than ${maxLength}`,
      });
    }

    // creating a post
    const newPost = new Post({
      postedBy: req.user._id,
      description,
      image,
    });

    // save post to DB
    await newPost.save();

    // success message
    res.status(201).json({ message: "Post Created successfully", newPost });
  } catch (error) {
    // handlying errors
    res.status(500).json({ message: error.message });
  }
};

// function to get post by id
const getPostById = async (req, res) => {
  try {
    // find a post by id
    const post = await Post.findById(req.params.id);

    // post is available or not
    if (!post) {
      return res
        .status(401)
        .json({ message: "Post not found give correct id" });
    }
    // success message
    res.status(200).json(post);
  } catch (error) {
    // handling errors
    res.status(500).json({ message: error.message });
  }
};

// function to delete post by id
const deletePostById = async (req, res) => {
  try {
    // find a post by id
    const post = await Post.findById(req.params.id);

    // post is available or not
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found give correct id" });
    }

    // checking if user has authorization or not
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to delete post" });
    }

    // delete the post
    await Post.deleteOne({ _id: req.params.id });

    // success message
    res.status(200).json({ message: "Post deleted succesfully" });
  } catch (error) {
    // handling error
    res.status(500).json({ message: error.message });
  }
};

// function to update post by id
const updatePostById = async (req, res) => {
  try {
    // extracting desc and image from request body
    const { description, image } = req.body;

    // find a post by id
    const post = await Post.findById(req.params.id);

    // post is available or not
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // checking if user has authorization or not
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to update post" });
    }

    // Check if the new description exceeds the maximum length
    if (description && description.length > 400) {
      return res
        .status(400)
        .json({ message: "Description should be less than 400 characters" });
    }

    // Update the post's fields only if new values are provided
    post.description = description || post.description;
    post.image = image || post.image;

    // save the updated post to db
    const updatedPost = await post.save();

    // success message
    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    // handle errors
    res.status500().json({ message: error.message });
  }
};
export { createPost, getPostById, deletePostById, updatePostById };

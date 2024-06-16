import mongoose from "mongoose";

// posts schema
const postSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
      maxLength: 400,
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", postSchema);

export default Post;

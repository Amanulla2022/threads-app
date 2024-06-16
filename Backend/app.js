import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import userRoutes from "./routes/usersRoutes.js";
import postRouter from "./routes/postRoutes.js";

// Load environment variables from .env file
dotenv.config();
connectDb(); // Connect to the database

const app = express(); // Creating an Express application
const PORT = process.env.PORT; // Get the port number from environment variables

// middleware
app.use(express.json()); // parse JSON data in the req.body

// Routes
app.use("/api/users", userRoutes); // Mount user routes at /api/users
app.use("/api/posts", postRouter); // Mount post routes at /api/posts

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port - ${PORT}`);
});

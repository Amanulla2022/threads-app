import jwt from "jsonwebtoken";
import User from "./../models/usersModel.js";
import { invalidatedTokens } from "../controllers/usersController.js";

// Middleware function to authenticate user
const auth = async (req, res, next) => {
  let token;

  // Check if authorization header with Bearer token is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from authorization header
      token = req.headers.authorization.split(" ")[1];

      // Check if the token is invalidated
      if (invalidatedTokens.includes(token)) {
        return res.status(401).json({ message: "Token invalid" });
      }

      // Verify token using JWT_SECRET from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by decoded ID from token, exclude password field
      req.user = await User.findById(decoded.id).select("-password");

      // Call next route handler
      next();
    } catch (error) {
      // handle errors
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no valid token found
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { auth };

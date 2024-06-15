import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import userRoutes from "./routes/usersRoutes.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // parse JSON data in the req.body

// Routes
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server started at port - ${PORT}`);
});

// # wXS5uEL4P3TaLrbZ
// # MONGO_URI = mongodb+srv://amanmulla167:wXS5uEL4P3TaLrbZ@cluster0.epagcj9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

import mongoose from "mongoose";

// async function to connect to mongoDB
const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected successfully");
  } catch (err) {
    console.error(`error: ${err}`);
  }
};

export default connectDataBase;

import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.error("Missing MONGODB_URL environment variable");
  }

  if (isConnected) {
    return console.log("MondoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "JobPlatform",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

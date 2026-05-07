import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB Reconnected");
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
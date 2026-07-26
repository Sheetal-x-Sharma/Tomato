import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "Zomato_Clone",
      serverSelectionTimeoutMS: 5000,
      family: 4, // Force IPv4
    });

    console.log("connected to mongodb");
  } catch (error) {
    console.log("Mongo Error:", error);
    process.exit(1);
  }
};

export default connectDB;
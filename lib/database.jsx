import mongoose from "mongoose";

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "project_management",
    });
    console.log("Connected");
  } catch (error) {
    console.log("Cannot connect to db");
  }
};

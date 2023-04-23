import mongoose from "mongoose";

export const connetedDb = async () => {
  try {
    await mongoose.connect(process.env.DB_LC_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("error connect database: " + error);
  }
};

// Import
import mongoose from "mongoose";

// Connection
const connecDB = async () => {
  try {
    const connec = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log(`MongoDB Error ${error}`);
  }
};

export default connecDB;

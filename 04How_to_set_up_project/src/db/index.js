// require('dotenv').config({path: './env'}) correct but not a good habit
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js"; ///Put full name otherwise it fails sometimes
dotenv.config({
  path: "./.env",
});
//This help to cofingure the .env
//As early as possible import and configure the .env
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n  Mongodb is connected || DB HOST${connectionInstance.connection.host}`
    );
    //Connection instance say that where to connect into the databse as in production there is a lot of database
  } catch (error) {
    console.log("MONODB failed to connect", error);
    process.exit(1);
  }
};
export default connectDB;

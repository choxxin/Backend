import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, //required :true ,[password need to be length of 8 digits]
    },
  },
  { timestamps: true } //This actually note down the time period of the data created at and last updated at
);

export const User = mongoose.model("User", userSchema);
//mongodb coverts the userschema in lowercase and plural so user will  be users

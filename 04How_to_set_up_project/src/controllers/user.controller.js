import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

const registerUser = asyncHandler(async (req, res) => {
  //STEPS
  //get user detail from the frontend
  // validation --field are not empty
  //check if user already exist
  // check for images,check for avatar
  //upload to them cloudinary
  //create user obj -create db entry
  // remove password and refresh tokens field from response
  //check for user user creation
  //check for res

  const { fullName, email, username, password } = req.body;

  console.log("email", email, password); // enter the raw data json type
  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required ");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with this email or username already exist");
  }

  // console.log(req.files);
  const avatarLocalpath = req.files?.avatar[0].path; //const avatarLocalpath = req.files?.avatar[0].path; is extracting the local file path of the uploaded avatar image from the req.files object. This is used to get the file path which will then be uploaded to Cloudinary

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImagelength > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is required");
  }
  //Its mandatory to uppload avatr but not the coverimage
  const avatar = await uploadOnCloudinary(avatarLocalpath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "File couldn't be uploaded");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowercase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" //This is the place which u didnt want to show These is the syntax
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went to wrong while registering user ");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
export { registerUser };

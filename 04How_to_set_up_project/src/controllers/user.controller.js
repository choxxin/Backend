import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

const generateAcessandrefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessTokens();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the refresh and access tokens "
    );
  }
};

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

  console.log("email", email, password, fullName); // enter the raw data json type
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const checker = [fullName, email, password, username];

  checker.map((value) => {
    if (value === "" || value == null) {
      throw new ApiError(400, "All fields are requireddddd");
    }
  });
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with this email or username already exist");
  }
  console.log("email", email, password, fullName); // enter the raw data json type

  // console.log(req.files);
  const avatarLocalpath = req.files?.avatar[0]?.path; //const avatarLocalpath = req.files?.avatar[0].path; is extracting the local file path of the uploaded avatar image from the req.files object. This is used to get the file path which will then be uploaded to Cloudinary
  console.log(avatarLocalpath);
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is required");
  }
  //Its mandatory to uppload avatr but not the coverimage
  const avatar = await uploadOnCloudinary(avatarLocalpath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  console.log(coverImage);
  if (!avatar) {
    throw new ApiError(400, "File couldn't be uploaded");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
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
//LOgin
//Steps
//1) req body -> data
//username or email
//find the user
//password check
//access and refesh tokens
//send cookie
const loginuser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!username || !email) {
    throw new ApiError(401, "All field are required");
  }

  const user = User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User doesn't exist ");
  }
  const ispasswordvalid = await user.ispasswordvalid(password);

  if (!ispasswordvalid) {
    throw new ApiError(401, "Password is invalid ");
  }

  const { accessToken, refreshToken } = generateAcessandrefreshTokens(user._id);

  const loggeduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggeduser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,

    {
      $unset: {
        refreshToken: 1, //Thsi removes the field from document
      },
    },
    {
      new: true,
    }
  );
});

export { registerUser };

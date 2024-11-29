import { asyncHandler } from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // take data from the frontend
  // check if all the fields are present
  // check if the fields are valid
  //check if the user already exists
  // upload the image on the cloudinary
  // create a new user in the database
  // remove the password from the response and also the refresh token
  // send the response

  const { email, password, username, fullname } = req.body;

  // if (!email || !password || !username || !fullname) {
  //   return ApiError(400, "All fields are required");
  // }

  if (
    [email, password, username, fullname].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalpath = req.files?.avatar[0].path;
  const coverImageLocalpath = req.files?.coverImage[0].path;

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar image is required");
  }

  const avatar = await uploadCloudinary(avatarLocalpath);
  const coverImage = await uploadCloudinary(coverImageLocalpath);

  if (!avatar) {
    throw new ApiError(500, "Image upload failed");
  }

  const user = User.create({
    email,
    password,
    username: username.toLowerCase(),
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating User");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };

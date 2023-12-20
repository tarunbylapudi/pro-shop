import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";
import createToken from "../utils/createToken.js";
import errorResponse from "../utils/errorResponse.js";

//@desc Login User & get token
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new errorResponse("User not registered", 401));
  }

  if (await user.matchPassword(password)) {
    createToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    next(new errorResponse("Invalid credentials!", 401));
  }
});

//@desc register User & get token
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new errorResponse("User already exists!", 400));
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    return next(new errorResponse("Invalid User data!", 400));
  }

  //create Cart
  const cart = new Cart()
  cart.user = user._id;
  const createdCart = await cart.save()
  if (!createdCart) {
    return next(new errorResponse("An Issue Occured, Please try again later!", 500));
  }

  createToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });

});

//@desc Logout User
//@route POST /api/users/logout
//@access public
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "logged out successfully!" });
});

//@desc get User profile
//@route POST /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new errorResponse("user not found!", 404));
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

//@desc update User profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new errorResponse("user not found!", 404));
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

//@desc get Users
//@route GET /api/users
//@access Private/admin
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).select("-password");
  if (users.length === 0) {
    return res.status(200).json({ message: "No users found!" });
  }
  res.status(200).json(users);
});

//@desc delate User
//@route DELETE /api/users/:id
//@access Private/admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new errorResponse("No user found!", 404));
  }
  await User.deleteOne(user._id);
  res.status(200).json({ message: "user successfully deleted!" });
});

//@desc get User by ID
//@route GET /api/users/:id
//@access Private/admin
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return next(new errorResponse("No user found!", 404));
  }
  res.status(200).json(user);
});

//@desc update User by ID
//@route PUT /api/users/:id
//@access Private/admin
const updateUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!user) {
    return next(new errorResponse("No user found!", 404));
  }
  res.status(200).json(user);
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};

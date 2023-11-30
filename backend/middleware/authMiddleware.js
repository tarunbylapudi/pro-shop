import User from "../models/UserModel.js";
import errorResponse from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (!token) {
    return next(new errorResponse("Not authorized, no token!", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    console.log(error);
    return next(new errorResponse("Not authorized, invalid token!", 401));
  }
};

//admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new errorResponse("Not authorized as admin!", 401));
  }
};

export { protect, admin };

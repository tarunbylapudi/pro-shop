import express from "express";
import { generateOtp, loginWithOTP } from "../controllers/authController.js";

const router = express.Router();

router.route("/generate/otp").post(generateOtp);
router.route("/login/otp").post(loginWithOTP);;

export default router;

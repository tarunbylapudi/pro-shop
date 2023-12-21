import express from "express";
import { createCart, addToWishList, getWishList, getCart, saveCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()
router.route("/").post(protect, saveCart)
router.route("/getCart").post(protect, getCart);
router.route("/create").post(protect, createCart);
router.route("/wishList").get(protect, getWishList).post(protect, addToWishList)

export default router
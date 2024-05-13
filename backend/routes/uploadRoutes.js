import path from "path";
import multer from "multer";
import { Router } from "express";
import fs from "fs";
import ProductImage from "../models/ImageModel.js";
import Product from "../models/ProductModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Please upload Images Only!"));
  }
}

const upload = multer({ storage, fileFilter });

router.post(
  "/productImage",
  protect,
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.body.productId);
    product.image.data = fs.readFileSync(req.file.path);
    product.image.contentType = `image/${path
      .extname(req.file.originalname)
      .toLowerCase()
      .replace(".", "")}`;
    await product.save();

    res.json({
      message: "Product Image uploaded successfully",
    });
  })
);

router.post(
  "/profileImage",
  protect,
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    user.image.data = fs.readFileSync(req.file.path);
    user.image.contentType = `image/${path
      .extname(req.file.originalname)
      .toLowerCase()
      .replace(".", "")}`;
    await user.save();
    res.json({
      message: "Profile Image uploaded successfully",
    });
  })
);

export default router;

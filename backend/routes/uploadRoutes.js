import path from "path";
import multer from "multer";
import { Router } from "express";
import fs from "fs";
import ProductImage from "../models/ImageModel.js";
import Product from "../models/ProductModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

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
  "/",
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.body.productId);
    product.img.data = fs.readFileSync(req.file.path);
    product.img.contentType = `image/${path
      .extname(req.file.originalname)
      .toLowerCase()
      .replace(".", "")}`;
    product.save();
    // const productImg = new ProductImage();
    // productImg.ProductImages.push({ data: fs.readFileSync(req.file.path) });
    // const savedImg = productImg.save();

    res.json({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  })
);

export default router;

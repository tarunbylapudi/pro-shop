import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";
import errorResponse from "../utils/errorResponse.js";

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  if (!products) {
    return next(new errorResponse("No Products Found!", 404));
  }
  res.status(200).json(products);
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new errorResponse(`No product found for ID : ${req.params.id}`, 404)
    );
  }
  res.status(200).json(product);
});

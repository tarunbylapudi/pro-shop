import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";
import errorResponse from "../utils/errorResponse.js";

//@desc get all products
//@route POST /api/products
//@access public
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  if (!products) {
    return next(new errorResponse("No Products Found!", 404));
  }
  res.status(200).json(products);
});

//@desc get single product
//@route POST /api/products/:id
//@access public
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new errorResponse(`No product found for ID : ${req.params.id}`, 404)
    );
  }
  res.status(200).json(product);
});

//@desc create product
//@route POST /api/products
//@access private /admin
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    user: req.user._id,
    name: "sample name",
    image: "/images/sample.jpg",
    brand: "brand",
    category: "category",
    description: "desc",
    numReviews: 10,
    countInStock: 10,
    price: 100,
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//@desc delete product
//@route DELETE /api/products/:id
//@access private /admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorResponse("No product found", 404));
  }
  await product.deleteOne(product._id);
  res.status(200).json({ message: `${product._id} deleted successfully` });
});

//@desc update product
//@route PUT /api/products/:id
//@access private /admin
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorResponse("No product found", 404));
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();

  res.status(200).json(updateProduct);
});

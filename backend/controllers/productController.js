import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";
import errorResponse from "../utils/errorResponse.js";
import searchQuery from "../utils/searchQuery.js";

//@desc get all products
//@route POST /api/products
//@access public
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? searchQuery(req.query.keyword) : {};
  const pageSize = process.env.PAGE_SIZE || 8;
  const count = await Product.countDocuments(keyword);
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (!products) {
    return next(new errorResponse("No Products Found!", 404));
  }
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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
  const { name, price, description, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorResponse("No product found", 404));
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();

  res.status(200).json(updateProduct);
});

//@desc add a review
//@route PUT /api/products/:id/reviews
//@access private /admin
export const addProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorResponse("No product found", 404));
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return next(
      new errorResponse("you have already reviewed this product", 400)
    );
  }

  const review = {
    rating: Number(rating),
    comment,
    name: req.user.name,
    user: req.user._id,
  };

  product.reviews.push(review);

  // product.rating =
  //   product.reviews.reduce((a, i) => a + i.rating, 0) / product.reviews.length;

  product.numReviews = product.reviews.length;

  await product.save();

  res.status(200).json({ message: "Review added successfully!" });
});

//@desc get top rated products
//@route GET /api/products/top
//@access public
export const getTopRatedProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.status(200).json(products);
});

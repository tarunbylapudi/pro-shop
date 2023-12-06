import express from "express";
import {
  getProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  addProductReview,
  getTopRatedProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopRatedProducts);
router
  .route("/:id")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route("/:id/reviews").post(protect, addProductReview);

export default router;

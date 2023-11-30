import express from "express";
import {
  getProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js"

const router = express.Router();

router.route("/").get(getAllProducts).post(protect,admin,createProduct);

router.route("/:id").get(getProduct).delete(protect,admin,deleteProduct);

export default router;

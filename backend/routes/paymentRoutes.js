import express from "express";
import {
  ctreatePaymentOrder,
  getRzpKey,
  paymentVarification,
} from "../controllers/paymentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/checkout").post(protect, ctreatePaymentOrder);
router.route("/verification").post(protect, paymentVarification);
router.route("/getRzpKey").get(protect, getRzpKey);

export default router;

import mongoose from "mongoose";

const ProductImageSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "Product",
//   },
  ProductImages: [{ data: Buffer, contentType: String }],
  reviewImages: [{ data: Buffer, contentType: String }],
});

const ProductImage = mongoose.model("ProductImage", ProductImageSchema);
export default ProductImage;

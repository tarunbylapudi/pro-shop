import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    image: { data: Buffer, contentType: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    isFavourite: { type: Boolean, default: false },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

productSchema.statics.getAvgRating = async function () {
  const obj = await this.aggregate([
    { $match: { _id: "$_id" } },
    { $unwind: "$reviews" },
    { $group: { _id: "$_id", averageRating: { $avg: "$reviews.rating" } } },
  ]);
  try {
    await this.findByIdAndUpdate(this._id, {
      rating: obj[0].averageRating,
    });
  } catch (error) {
    console.log(error);
  }
};

// productSchema.post("save", async function () {
//   await this.constructor.getAvgRating();
//   this.numReviews = this.reviews.length;
// });

const Product = mongoose.model("Product", productSchema);

export default Product;

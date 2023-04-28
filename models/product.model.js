import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 0, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  image: {
    type: String,
    default: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEYU7gR32xChbBPeVKPBMu2Rsfs0593Lf0Gw&usqp=CAU`,
  },
  rating: { type: [Number], min: 0, max: 5 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
    },
  ],
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "active" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const Product = mongoose.model("Product", productSchema);

export default Product;

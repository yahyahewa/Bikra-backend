import mongoose from "mongoose";

/// category models
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;

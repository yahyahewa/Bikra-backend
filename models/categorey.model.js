import mongoose from "mongoose";

/// category models
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgae: {
    type: String,
    default: `https://cdn3d.iconscout.com/3d/premium/thumb/category-6434155-5350238.png`,
  },
  createAt: { type: Date, default: Date.now },
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;

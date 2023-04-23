import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  customer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  quantity: { type: Number, default: 1 },
  status: { type: String, default: "card" },
  dateOrdered: { type: Date, default: Date.now },
  dateDelivered: { type: Date },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

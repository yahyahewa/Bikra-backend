import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { tryCatch } from "../utils/tryCatch.js";
export const addToCart = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    await Product.findByIdAndUpdate(req.body.product, {
      $push: { order: order._id },
    });
    await User.findByIdAndUpdate(req.body.customerId, {
      $push: { order: order._id },
    });
    res.status(201).json({ status: "success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.params.id,
      status: "basket",
    }).populate("product");
    res.status(200).json({ status: "success", data: orders });
  } catch (err) {
    res.status(400).json({ status: "faily", message: err.message });
  }
};

// delette order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: order });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

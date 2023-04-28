import Order from "../models/order.model.js";
import { tryCatch } from "../utils/tryCatch.js";

export const addToCart = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ status: "success", data: order });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

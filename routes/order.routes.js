import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getOrders,
  deleteOrder,
  Checkout,
  getOrdersAccount,
} from "../controllers/order.controller.js";
const OrderRouter = Router();

OrderRouter.route("/").post(protect, addToCart).patch(protect, Checkout);
OrderRouter.route("/:id").get(protect, getOrders).delete(protect, deleteOrder);
OrderRouter.route("/order/:id").get(protect, getOrders);

export default OrderRouter;

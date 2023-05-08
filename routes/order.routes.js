import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getOrders,
  deleteOrder,
} from "../controllers/order.controller.js";
const OrderRouter = Router();

OrderRouter.route("/").post(protect, addToCart);
OrderRouter.route("/:id").get(protect, getOrders).delete(protect, deleteOrder);
OrderRouter;

export default OrderRouter;

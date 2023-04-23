import { Router } from "express";
import {
  addProdcut,
  getAllProducts,
} from "../controllers/products.controls.js";

const ProductRouter = Router();
ProductRouter.route("/").post(addProdcut);
ProductRouter.route("/").get(getAllProducts);
export default ProductRouter;

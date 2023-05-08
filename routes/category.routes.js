import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller.js";

const categoryRouter = Router();
categoryRouter.route("/").post(createCategory).get(getAllCategories);

export default categoryRouter;

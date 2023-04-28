import { Router } from "express";
import { createCategory } from "../controllers/category.controller.js";

const CategoryRouter = Router();
CategoryRouter.route("/").post(createCategory);

export default CategoryRouter;

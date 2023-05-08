import Category from "../models/categorey.model.js";
import { tryCatch } from "../utils/tryCatch.js";
//
/// create new category
export const createCategory = tryCatch(async (req, res, next) => {
  const { name, description } = req.body;
  const category = await Category.create({ name, description });
  res.status(201).json({ status: "success", data: category });
});
//
/// get all categories
export const getAllCategories = tryCatch(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({ status: "success", data: categories });
});
//

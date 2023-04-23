import Product from "../models/product.model.js";

export const addProdcut = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ status: "success", data: product });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: "success", data: products });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err.message });
  }
};

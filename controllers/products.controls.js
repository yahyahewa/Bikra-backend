import Product from "../models/product.model.js";
import { tryCatch } from "../utils/tryCatch.js";
export const addProdcut = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ status: "success", data: product });
  } catch (err) {
    console.log(err);
    next(err);
    // res.status(400).json({ status: "fail", message: err.message });
  }
};
//
// find prouct by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    console.log(err);
    // res.status(400).json({ status: "fail", message: err.message });
  }
};
//

// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({ status: "success", data: products });
//   } catch (err) {
//     console.log(err);
//     next(err);
//     // res.status(400).json({ status: "fail", message: err.message });
//   }
// };

export const filterProduct = async (req, res) => {
  try {
    let query = JSON.stringify(req.query);
    query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let queryObj = JSON.parse(query);

    const excluteQuery = ["sort", "limit", "page", "fields", "search"];

    excluteQuery.forEach((key) => {
      delete queryObj[key];
    });

    if (req.query.search) {
      queryObj.fullName = new RegExp(req.query.search, "i");
    }

    const getQuery = Product.find(queryObj);

    if (req.query.sort) {
      getQuery.sort(req.query.sort);
    }

    if (req.query.fields) {
      getQuery.select(req.query.fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = limit * (page - 1);

    getQuery.skip(skip).limit(limit);

    const products = await getQuery;

    res.json({ status: "success", results: products.length, data: products });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

//
export const staticsProduct = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $match: { price: { $gte: 100 } },
      },
      {
        $group: {
          _id: "$price",
          avg: { $avg: "$discount" },
          max: { $max: "$price" },
          min: { $min: "$price" },
        },
      },
      {
        $sort: { avg: 1 },
      },
    ]);
    res.json({ status: "success", data: stats });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

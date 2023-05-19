import Category from "../models/categorey.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { tryCatch } from "../utils/tryCatch.js";

// find prouct by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findByIdAndUpdate(req.body.owner, {});
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    console.log(err);
    // res.status(400).json({ status: "fail", message: err.message });
  }
};
// retriv of customer products
export const getCustomerProducts = tryCatch(async (req, res, next) => {
  if (req.params.id) {
    const products = await Product.find({ owner: req.params.id });
    res
      .status(200)
      .json({ status: "success", resulat: products.length, data: products });
  } else {
    next(new CustomError("please provide user id", 400));
  }
});
//
export const addProdcut = tryCatch(async (req, res, next) => {
  const product = await Product.create(req.body);

  await Category.findByIdAndUpdate(req.body.category, {
    $push: { productId: product._id },
  });
  await User.findByIdAndUpdate(req.body.owner, {
    $push: { product: product._id },
  });
  res.status(201).json({ status: "success", data: product });
});

export const filterProduct = async (req, res) => {
  try {
    const productsLenght = await Product.find();
    let query = JSON.stringify(req.query);
    query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let queryObj = JSON.parse(query);

    const excluteQuery = [
      "sort",
      "category",
      "limit",
      "page",
      "fields",
      "search",
    ];
    excluteQuery.forEach((key) => {
      delete queryObj[key];
    });

    if (req.query.search) {
      queryObj.name = new RegExp(req.query.search, "i");
    }
    if (req.query.category) {
      console.log(req.query.category);
      queryObj.category = `${req.query.category}`;
    }
    const getQuery = Product.find(queryObj);

    if (req.query.sort) {
      getQuery.sort(req.query.sort);
    }

    if (req.query.fields) {
      getQuery.select(req.query.fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 0;
    const skip = limit * (page - 1);

    getQuery.skip(skip).limit(limit);

    const products = await getQuery;

    res.json({
      status: "success",
      results: productsLenght.length,
      resultsearch: products.length,
      data: limit == 0 ? [] : products,
    });
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

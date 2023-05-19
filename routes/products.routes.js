import { Router } from "express";
import {
  addProdcut,
  filterProduct,
  getProductById,
  staticsProduct,
  getCustomerProducts,
} from "../controllers/products.controls.js";
import {
  uploadImage,
  uploadImages,
  resizeImage,
  resizeImages,
} from "../middleware/multer.middlware.js";
import { protect } from "../middleware/auth.middleware.js";

const ProductRouter = Router();
ProductRouter.route("/").post(protect, addProdcut).get(filterProduct);
ProductRouter.route("/user/:id").get(protect, getCustomerProducts);
ProductRouter.route("/agr/").get(staticsProduct);
ProductRouter.route("/:id").get(getProductById);
ProductRouter.route("/upload").post(uploadImage, resizeImage, (req, res) => {
  res.send({ status: "success", data: req.file.filename });
});
ProductRouter.route("/uploads").post(uploadImages, resizeImages, (req, res) => {
  console.log(req.files);
  res.send({ status: "success", data: req.file.filename });
});
export default ProductRouter;

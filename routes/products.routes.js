import { Router } from "express";
import {
  addProdcut,
  filterProduct,
  getProductById,
  staticsProduct,
} from "../controllers/products.controls.js";
import {
  uploadImage,
  uploadImages,
  resizeImage,
  resizeImages,
} from "../middleware/multer.middlware.js";

const ProductRouter = Router();
ProductRouter.route("/").post(addProdcut).get(filterProduct);
ProductRouter.route("/agr/").get(staticsProduct);
// ProductRouter.route("/").get(filterProduct);
ProductRouter.route("/:id").get(getProductById);
ProductRouter.route("/upload").post(uploadImage, resizeImage, (req, res) => {
  console.log(req.file);
  res.send({ status: "success", data: req.file.filename });
});
ProductRouter.route("/uploads").post(uploadImages, resizeImages, (req, res) => {
  console.log(req.files);
  res.send({ status: "success", data: req.file.filename });
});
export default ProductRouter;

import multer from "multer";
import CustomError from "../customError.js";
import sharp from "sharp";
const multerStorage = multer.memoryStorage({});
const extFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new CustomError("Not an image! Please upload an image.", 400, 5000));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: extFilter });
export const uploadImage = upload.single("photo");
export const uploadImages = upload.array("photos", 10);

export const resizeImage = async (req, res, next) => {
  try {
    if (!req.file) return next();
    req.file.filename = `product-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/image/${req.file.filename}`);

    next();
  } catch (err) {
    next(err);
  }
};
export const resizeImages = async (req, res, next) => {
  try {
    if (!req.files) return next();
    for (let i; i < req.files.length; i++) {
      req.files[i].filename = `product-${Date.now()}.jpeg`;
      await sharp(req.files[i].buffer)
        .resize(500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/image/${req.files[i].filename}`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/products");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     if (
//       ext === "jpeg" ||
//       ext === "jpg" ||
//       ext === "png" ||
//       ext === "gif" ||
//       ext === "svg"
//     ) {
//       cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//     } else {
//       cb(new Error("Not an image! Please upload an image."), false);
//     }
//   },
// });

import Seller from "../models/seller.account.model.js";
export const signup = async (req, res, next) => {
  try {
    res.json({ status: "success", data: req.user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const profile = async (req, res) => {
  try {
    const product = await Seller.findById(req.user.sub);
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err.message });
  }
};

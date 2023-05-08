import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
/// create new user
export const signup = async (req, res, next) => {
  try {
    const body = { sub: req.user._id, email: req.user.email };
    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
      expiresIn: "7 days",
    });
    res.status(200).json({
      status: "success",
      data: {
        data: { email: req.user.email, _id: req.user._id, role: req.user.role },
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

/// login user
export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err.message });
  }
};

/// git user by token
export const getUSerWithToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

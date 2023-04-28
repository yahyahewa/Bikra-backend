import passport from "passport";
import Jwt from "jsonwebtoken";
import Seller from "../models/seller.account.model.js";

// login middleware
export const LoginMiddlware = (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("no user found");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { sub: user._id, email: user.email };
        const token = Jwt.sign({ user: body }, process.env.JWT_SECRET);
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

// create protect middleware
export const protect = passport.authenticate("jwt", { session: false });
export const isAdmin = async (req, res, next) => {
  try {
    const user = await Seller.findById(req.user.sub);
    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ status: "fail", message: "not authorized" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

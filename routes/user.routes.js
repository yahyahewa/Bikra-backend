import { Router } from "express";
import { signup } from "../controllers/user.controll.js";
import passport from "passport";
import {
  LoginMiddlware,
  protect,
  isAdmin,
} from "../middleware/auth.middleware.js";
import { profile } from "../controllers/user.controll.js";
const userRouter = Router();
userRouter
  .route("/signup")
  .post(passport.authenticate("signup", { session: false }), signup);
userRouter.route("/login").post(LoginMiddlware);
userRouter.route("/profile").get(protect, isAdmin, profile);
export default userRouter;

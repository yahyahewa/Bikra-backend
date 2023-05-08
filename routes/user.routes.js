import { Router } from "express";
import passport from "passport";
import { protect } from "../middleware/auth.middleware.js";
import {
  profile,
  signup,
  getUSerWithToken,
} from "../controllers/user.controll.js";
import { LoginMiddlware, isAdmin } from "../middleware/auth.middleware.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - email
 *          - password
 *       properties:
 *          _id:
 *            type: ObjectId
 *            description: The auto-generated id of the user
 *          name:
 *            type: string
 *            description: The user's name
 *          email:
 *            type: string
 *            description: The user's email
 *          password:
 *            type: string
 *            description: The user's password
 *          role:
 *            type: string
 *            description: The user's role
 *          logo:
 *            type: string
 *            description: The shop's logo
 *          address:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              long:
 *                type: string
 *              lati:
 *                type: string
 *          status:
 *            type: string
 *            description: The user's status
 *          enable:
 *            type: boolean
 *            description: The user's enable
 *          product:
 *            type: array
 *            items:
 *              type: ObjectId
 *              description: The product's id
 *       example:
 *          _id: 60f1a1b4c9b0c71f0c9b0c71
 *          name: Le Van A
 *          email: yahyahiwa@gmail.com
 *          password: 123456
 *          role: user
 *          logo: https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200778/117610020-retail-store-logo-design-template-shopping-cart-logo-icon-design.jpg
 *          address:
 *            name: 123 Nguyen Van Linh
 *            long: 123.123
 *            lati: 123.123
 *          status: normal
 *          enable: true
 *          product: [60f1a1b4c9b0c71f0c9b0c71,60f1a1b4c9b0c71f0c9b0c71]
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 * /api/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                 type: string
 *                data:
 *                 type: object
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                      type: Number
 *                     message:
 *                      type: string
 */
userRouter
  .route("/signup")
  .post(passport.authenticate("signup", { session: false }), signup);
userRouter.route("/login").post(LoginMiddlware).get(protect, getUSerWithToken);
// userRouter.route("/profile").get(protect, isAdmin, profile);
userRouter.route("/profile").get(protect, profile);
export default userRouter;

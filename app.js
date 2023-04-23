import express from "express";
import morgan from "morgan";
import { connetedDb } from "./config/db.js";
import productRouter from "./routes/products.routes.js";
import userRouter from "./routes/user.routes.js";
import "./strategy/auth.js";
import dotenv from "dotenv";
dotenv.config();
// connecte to the database
connetedDb();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
export default app;

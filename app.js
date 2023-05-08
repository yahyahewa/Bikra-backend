import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import path from "path";
import cors from "cors";
import { connetedDb } from "./config/db.js";
import OrderRouter from "./routes/order.routes.js";
import productRouter from "./routes/products.routes.js";
import userRouter from "./routes/user.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import "./strategy/auth.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import dotenv from "dotenv";
import { trimQueryMiddleware } from "./middleware/trimQuery.middleware.js";
import { swaggerSpec } from "./config/swagger.js";
dotenv.config();
// connecte to the database
connetedDb();

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(trimQueryMiddleware);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api-docs/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/order", OrderRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/category", CategoryRouter);
app.use(errorHandler);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
export default app;

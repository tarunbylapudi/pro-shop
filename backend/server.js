import path from "path";
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" assert { type: "json" };
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;

//connect to MongoDb
connectDB();

const app = express();
const router = express.Router();

//cprs config
app.use(cors());

//body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

//cookie parser
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is runninng...");
  });
}

app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `Server started running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);

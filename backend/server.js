import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 5000;

//connect to MongoDb
connectDB();

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("HI");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started running on port ${port}`));

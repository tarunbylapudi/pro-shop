import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const port = process.env.PORT || 5000;

//connect to MongoDb
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("HI");
});

app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started running on port ${port}`));

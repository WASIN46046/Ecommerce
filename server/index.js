import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import morgan from "morgan";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();


//db
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB ERROR => ", err));

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//router middleware
app.use("/api",authRoutes);
app.use("/api",categoryRoutes);
app.use("/api", productRoutes);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});


import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Health check
app.get("/", (req, res) => {
  res.send("API running 🚀");
});


app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
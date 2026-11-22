const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const alertRoutes = require("./routes/alertRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    if (res.statusCode >= 400) {
      console.error(
        `[API Error] ${req.method} ${req.originalUrl} - ${res.statusCode}:`,
        body
      );
    }

    return originalJson(body);
  };

  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/alerts", alertRoutes);

app.use((req, res) => {
  const body = {
    message: "API route not found",
    path: req.originalUrl,
  };

  console.error(`[API Error] ${req.method} ${req.originalUrl} - 404:`, body);
  res.status(404).json(body);
});

app.use((error, req, res, next) => {
  console.error(`[API Error] ${req.method} ${req.originalUrl}:`, error);

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error",
  });
});

module.exports = app;

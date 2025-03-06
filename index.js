const express = require("express");
const connectDB = require("./server");

const {
  CreateProduct,
  GetAllItems,
  GetElementById,
  updateProduct,
  deleteProduct,
} = require("./Controllers/productController");

const app = express();

// Middleware
app.use(express.json());
connectDB();

// Routes
app.get("/api/items", GetAllItems);
app.post("/api/items", CreateProduct);
app.get("/api/items/:id", GetElementById);
app.put("/api/items/:id", updateProduct);
app.delete("/api/items/:id", deleteProduct);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server start message to the console.
});

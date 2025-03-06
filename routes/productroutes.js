const express = require("express");
const {
  CreateProduct,
  GetAllItems,
  GetElementById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");

const router = express.Router();

router.get("/api/items", GetAllItems);
router.post("/api/items", CreateProduct);
router.get("/api/items/:id", GetElementById);
router.put("/api/items/:id", updateProduct);
router.delete("/api/items/:id", deleteProduct);

module.exports = router;

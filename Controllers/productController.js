const Product = require("../Model/productSchema.js");

exports.CreateProduct = async (req, res) => {
  const { name, price, category } = req.body;

  // Validate input
  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    const product = new Product({
      name: name,
      price: price,
      category: category,
    });

    await product.save();

    console.log("Product created successfully");

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.GetAllItems = async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json({
      success: true,
      message: "All products get back successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetElementById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

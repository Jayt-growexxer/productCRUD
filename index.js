const express = require("express");
const connectDB = require("./server");
const productRoute = require("./routes/productroutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Middleware
app.use(express.json());
connectDB();

// Routes
app.use("/v0", productRoute);
app.use("/v0", userRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server start message to the console.
});

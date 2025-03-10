const express = require("express");
const {
  createUser,
  signin,
  forgetPassword,
  resetPassword,
  updateProfile,
  protect,
  GetProfile,
} = require("../Controllers/authController");

const routes = express.Router();

routes.post("/api/auth/register", createUser);
routes.post("/api/auth/login", signin);
routes.post("/api/auth/forget", forgetPassword);
routes.post("/api/auth/resetPassword/:token", resetPassword);

routes.put("/api/auth/updateProfile", protect, updateProfile);
routes.get("/api/auth/profile", protect, GetProfile);
module.exports = routes;

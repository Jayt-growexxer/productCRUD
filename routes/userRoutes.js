const express = require("express");
const {
  createUser,
  signin,
  forgetPassword,
} = require("../Controllers/authController");

const routes = express.Router();

routes.post("/api/auth/register", createUser);
routes.post("/api/auth/login", signin);
routes.post("/api/auth/forget", forgetPassword);

module.exports = routes;

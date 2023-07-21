const express = require("express");
const {
  CreateCategoryCtrl,
  fetchCategoriesCtrl,
} = require("../../controllers/category/categoryCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, CreateCategoryCtrl);
categoryRoute.get("/", authMiddleware, fetchCategoriesCtrl);

module.exports = categoryRoute;

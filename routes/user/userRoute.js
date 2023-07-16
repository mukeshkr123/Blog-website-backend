const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  fetchUserCtrl,
  fetchUserProfileCtrl,
  updateUserProfileCtrl,
} = require("../../controllers/user/userCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddlewarw");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl); // register a user
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", authMiddleware, fetchUsersCtrl);
userRoutes.get("/:id", fetchUserCtrl);
userRoutes.get("/profile/:id", authMiddleware, fetchUserProfileCtrl);
userRoutes.get("/profile/:id", authMiddleware, fetchUserProfileCtrl);
userRoutes.put("/update-profile", authMiddleware, updateUserProfileCtrl);

module.exports = userRoutes;

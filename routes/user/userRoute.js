const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  fetchUserCtrl,
  fetchUserProfileCtrl,
  updateUserProfileCtrl,
  updatePasswordCtrl,
  followUserCtrl,
} = require("../../controllers/user/userCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl); // Register a user
userRoutes.post("/login", loginUserCtrl); // Login user
userRoutes.get("/", authMiddleware, fetchUsersCtrl); // Fetch all users
userRoutes.get("/:id", fetchUserCtrl); // Fetch user details
userRoutes.get("/profile/:id", authMiddleware, fetchUserProfileCtrl); // Fetch user profile details
userRoutes.put("/update-profile", authMiddleware, updateUserProfileCtrl); // Update user profile
userRoutes.put("/change-password", authMiddleware, updatePasswordCtrl); // Change user password
userRoutes.post("/follow", authMiddleware, followUserCtrl); // follow user

module.exports = userRoutes;

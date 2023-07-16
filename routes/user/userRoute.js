const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  fetchUserCtrl,
} = require("../../controllers/user/userCtrl");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl); // register a user
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", fetchUsersCtrl);
userRoutes.get("/:id", fetchUserCtrl);

module.exports = userRoutes;

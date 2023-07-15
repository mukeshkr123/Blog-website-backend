const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
} = require("../../controllers/user/userCtrl");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl); // register a user
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", fetchUsersCtrl);

module.exports = userRoutes;

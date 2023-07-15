const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
} = require("../../controllers/user/userCtrl");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl); // register a user
userRoutes.post("/login", loginUserCtrl);

module.exports = userRoutes;

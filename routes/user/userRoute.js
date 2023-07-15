const express = require("express");
const { userRegisterCtrl } = require("../../controllers/user/userCtrl");
const userRoutes = express.Router();

userRoutes.get("/register", userRegisterCtrl); // register a user

module.exports = userRoutes;

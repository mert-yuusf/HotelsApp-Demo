const express = require("express");
const { authController } = require("../controllers");


const authRoutes = express.Router();

authRoutes.post("/auth/signup", authController.signup);
authRoutes.post("/auth/login", authController.login);
authRoutes.post("/auth/logout", authController.logout);
authRoutes.post("/auth/forget-password", authController.forgetPassword);
authRoutes.put("/auth/rest-password", authController.resetPassword);


module.exports = authRoutes;


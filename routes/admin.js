const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { jwtAuthMiddleware, generateToken } = require("../utils/jwt");

const { AdminRegister, AdminLogin, UpdateAdmin, GenerateOTP, ForgotAdminPassword, DeleteAdminAccount } = require("../controller/userController");


module.exports = router;
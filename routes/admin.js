const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { jwtAuthMiddleware, generateToken } = require("../utils/jwt");

const { AdminRegister, AdminLogin, UpdateAdmin, GenerateOTP, ForgotAdminPassword, DeleteAdminAccount } = require("../controller/adminController");

router.post("/AdminSignup", AdminRegister);
router.post("/AdminLogin", AdminLogin);
router.put("/UpdateAdminProfile", jwtAuthMiddleware, upload.single("photo"), UpdateAdmin);
router.post("/GenerateOTP", jwtAuthMiddleware, GenerateOTP);
router.put("/ForgotAdminPassword", jwtAuthMiddleware, ForgotAdminPassword);
router.delete("/DeleteAdminAccount", jwtAuthMiddleware, DeleteAdminAccount);

module.exports = router;
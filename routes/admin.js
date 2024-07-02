const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { adminJWTAuthMiddleware, generateAdminToken } = require("../utils/jwt");

const { AdminRegister, AdminLogin, UpdateAdmin, GenerateOTP, ForgotAdminPassword, DeleteAdminAccount } = require("../controller/adminController");

// Admiun Profile Route
router.post("/AdminSignup", AdminRegister);
router.post("/AdminLogin", AdminLogin);
router.put("/UpdateAdminProfile", adminJWTAuthMiddleware, upload.single("photo"), UpdateAdmin);
router.post("/GenerateOTP", adminJWTAuthMiddleware, GenerateOTP);
router.put("/ForgotAdminPassword", adminJWTAuthMiddleware, ForgotAdminPassword);
router.delete("/DeleteAdminAccount", adminJWTAuthMiddleware, DeleteAdminAccount);

module.exports = router;
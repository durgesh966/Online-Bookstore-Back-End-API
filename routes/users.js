const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { jwtAuthMiddleware, generateToken } = require("../utils/jwt");

const { register, login, updateUser, generateOTP, forgotpassword, deleteAccount } = require("../controller/userController");

router.post("/signup", register);
router.post("/login", login);
router.put("/updateUser", jwtAuthMiddleware, upload.single("photos"), updateUser);
router.post("/generateotp", jwtAuthMiddleware, generateOTP);
router.delete("/delete", jwtAuthMiddleware, deleteAccount);
router.put("/forgotpassword", jwtAuthMiddleware, forgotpassword);

module.exports = router;
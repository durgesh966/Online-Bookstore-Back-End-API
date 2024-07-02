const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { userJWTAuthMiddleware, generateUserToken } = require("../utils/jwt");

const { register, login, updateUser, generateOTP, forgotpassword, deleteAccount } = require("../controller/userController");

router.post("/signup", register);
router.post("/login", login);
router.put("/updateUser", userJWTAuthMiddleware, upload.single("photos"), updateUser);
router.post("/generateotp", userJWTAuthMiddleware, generateOTP);
router.delete("/delete", userJWTAuthMiddleware, deleteAccount);
router.put("/forgotpassword", userJWTAuthMiddleware, forgotpassword);

module.exports = router;
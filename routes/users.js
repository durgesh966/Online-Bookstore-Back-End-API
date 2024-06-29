const express = require("express");
const router = express.Router();

const { register, login, generateOTP, deleteAccount } = require("../controller/userController");

router.post("/signup", register);
router.post("/login", login);
router.post("/generateotp", generateOTP);
router.delete("/delete", deleteAccount);

module.exports = router;
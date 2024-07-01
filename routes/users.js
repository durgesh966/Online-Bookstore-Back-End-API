const express = require("express");
const router = express.Router();

const { register, login, updateUser, generateOTP, forgotpassword, deleteAccount } = require("../controller/userController");

router.post("/signup", register);
router.post("/login", login);
router.put("/updateUser", updateUser);
router.post("/generateotp", generateOTP);
router.delete("/delete", deleteAccount);
router.put("/forgotpassword", forgotpassword);

module.exports = router;
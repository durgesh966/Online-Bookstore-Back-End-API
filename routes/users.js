const express = require("express");
const router = express.Router();

const { register, login, deleteAccount } = require("../controller/userController");

router.post("/signup", register);
router.post("/login", login);
router.delete("/delete", deleteAccount);

module.exports = router;
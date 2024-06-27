const express = require("express");
const router = express.Router();


const { register, login } = require("../controller/userController");

router.post("/signup", register);
router.post("/login", login);


module.exports = router;
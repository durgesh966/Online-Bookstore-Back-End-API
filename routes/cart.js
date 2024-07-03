const express = require("express");
const router = express.Router();

const { userJWTAuthMiddleware } = require("../utils/jwt");

const { addCartRoute } = require("../controller/cartController");

router.post("/addToCart", userJWTAuthMiddleware, addCartRoute);

module.exports = router;
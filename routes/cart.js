const express = require("express");
const router = express.Router();

const { userJWTAuthMiddleware } = require("../utils/jwt");

const { addCartRoute, getCartRoute } = require("../controller/cartController");

router.post("/addToCart", userJWTAuthMiddleware, addCartRoute);
router.get("/getCartInformation/:cartID", userJWTAuthMiddleware, getCartRoute);

module.exports = router;
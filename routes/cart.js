const express = require("express");
const router = express.Router();

const { userJWTAuthMiddleware } = require("../utils/jwt");

const { getAllCartRoute, addCartRoute, getCartRoute, deleteCartRoute } = require("../controller/cartController");

router.get("/getAllCarts/:user_Id", userJWTAuthMiddleware, getAllCartRoute);
router.post("/addToCart", userJWTAuthMiddleware, addCartRoute);
router.get("/getCartInformation/:cartID", userJWTAuthMiddleware, getCartRoute);
router.delete("/deleteCartInformation/:cartID", userJWTAuthMiddleware, deleteCartRoute);

module.exports = router;
const express = require("express");
const router = express.Router();

const { userJWTAuthMiddleware } = require("../utils/jwt");

const { getAllCartRoute, addCartRoute, getCartRoute, deleteCartRoute, getAllHistoryRoute, cartFullHistoryRoute } = require("../controller/cartController");

router.get("/getAllCarts/:user_Id", userJWTAuthMiddleware, getAllCartRoute);
router.post("/addToCart", userJWTAuthMiddleware, addCartRoute);
router.get("/getCartInformation/:cartID", userJWTAuthMiddleware, getCartRoute);
router.delete("/deleteCartInformation/:cartID", userJWTAuthMiddleware, deleteCartRoute);
router.get("", userJWTAuthMiddleware, getAllHistoryRoute);
router.post("/cartFullHistory/:history_id", userJWTAuthMiddleware, cartFullHistoryRoute);

module.exports = router;
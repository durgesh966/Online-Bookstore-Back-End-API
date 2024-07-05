const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { userJWTAuthMiddleware, generateUserToken, adminJWTAuthMiddleware, generateAdminToken } = require("../utils/jwt");

const { addOrderRoute, orderitemsRoute, viewOrderItemsRoute, showAllOrders, showFullInfoOfOrders } = require("../controller/orderController");

// ---------- admin route -------------
router.get("/allOrders", adminJWTAuthMiddleware, showAllOrders);
router.post("/fullInfoOfOrders", adminJWTAuthMiddleware, showFullInfoOfOrders);

// ---------- user routr ----------------
router.post("/addOrders", userJWTAuthMiddleware, addOrderRoute);
router.post("/orderItems", userJWTAuthMiddleware, orderitemsRoute);
router.get("/viewOrderItems", viewOrderItemsRoute);


module.exports = router;
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { adminJWTAuthMiddleware, generateAdminToken } = require("../utils/jwt");

const { showAllOrders, showFullInfoOfOrders } = require("../controller/orderController");

router.get("/allOrders", adminJWTAuthMiddleware, showAllOrders);
router.post("/fullInfoOfOrders", adminJWTAuthMiddleware, showFullInfoOfOrders);


module.exports = router;
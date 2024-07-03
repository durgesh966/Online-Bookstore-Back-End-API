const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const bookUpload = require("../middleware/multer");
const { adminJWTAuthMiddleware, generateAdminToken } = require("../utils/jwt");

const { uploadBookRoute } = require("../controller/bookController");

router.post("/uploadBook", adminJWTAuthMiddleware, upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), uploadBookRoute);

module.exports = router;
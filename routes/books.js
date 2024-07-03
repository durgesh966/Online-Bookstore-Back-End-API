const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { adminJWTAuthMiddleware, generateAdminToken } = require("../utils/jwt");

const { uploadBookRoute, updateBookRoute, deleteBookRoute } = require("../controller/bookController");

router.post("/uploadBook", adminJWTAuthMiddleware, upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), uploadBookRoute);
router.put("/updateBook/:serialNumber", adminJWTAuthMiddleware, upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), updateBookRoute);
router.delete("/deleteBook/:serialNumber", adminJWTAuthMiddleware, deleteBookRoute);

module.exports = router;
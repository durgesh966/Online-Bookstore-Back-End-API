const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { userJWTAuthMiddleware, generateUserToken, adminJWTAuthMiddleware, generateAdminToken } = require("../utils/jwt");

const {
    getAllBooks,
    searchBookRoute,
    viewBookDetailsRoute,
    // Admin Route
    uploadBookRoute,
    updateBookRoute,
    deleteBookRoute
} = require("../controller/bookController");

router.get("/showAllBooks", userJWTAuthMiddleware, getAllBooks);
router.post("/searchBook", userJWTAuthMiddleware, searchBookRoute);
router.post("/viewBookDetails/:serialNumber", userJWTAuthMiddleware, viewBookDetailsRoute);

// Admin Controll Route

router.post("/uploadBook", adminJWTAuthMiddleware, upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), uploadBookRoute);
router.put("/updateBook/:serialNumber", adminJWTAuthMiddleware, upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), updateBookRoute);
router.delete("/deleteBook/:serialNumber", adminJWTAuthMiddleware, deleteBookRoute);

module.exports = router;
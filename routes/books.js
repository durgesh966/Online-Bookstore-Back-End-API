const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const { jwtAuthMiddleware, generateToken } = require("../utils/jwt");
"use strict";

const express = require("express");
const { catchAsync } = require("../auth/auth.utils");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", catchAsync(UserController.register));

module.exports = router;

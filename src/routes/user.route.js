"use strict";

const express = require("express");
const UserController = require("../controllers/user.controller");
const { authPermission, authToken } = require("../auth/auth.verify");
const catchAsync = require("../helpers/catchAsync");
const router = express.Router();

router.post("/register", catchAsync(UserController.register));

router.use(catchAsync(authPermission("0000")));
router.post("/login", catchAsync(UserController.login));

router.post(
	"/logout",
	catchAsync(authToken),
	catchAsync(UserController.logout)
);

module.exports = router;

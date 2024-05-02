"use strict";

const express = require("express");
const UserController = require("../controllers/user.controller");
const { authPermission, authToken } = require("../auth/auth.verify");
const catchAsync = require("../helpers/catchAsync");
const router = express.Router();

router.post("/register", catchAsync(UserController.register));

router.use(catchAsync(authPermission("0000"))); // check APIKEY

/*
	x-api-key		
*/
router.post("/login", catchAsync(UserController.login));

/*
	x-api-key
	x-client-id
	Authorization
*/
router.post(
	"/logout",
	catchAsync(authToken),
	catchAsync(UserController.logout)
);

/*
	x-api-key
	x-client-id
	Authorization
*/
router.post(
	"/refreshTokenPair",
	catchAsync(authToken),
	catchAsync(UserController.refreshTokenPair)
);

module.exports = router;

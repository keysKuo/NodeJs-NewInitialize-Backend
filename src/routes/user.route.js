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

// Authentication Tokens
router.use(catchAsync(authToken));

/*
@headers	x-api-key,x-client-id,Authorization
*/
router.post("/logout", catchAsync(UserController.logout));

/*
@headers	x-api-key, x-client-id, x-rtoken-id
*/
router.post("/refreshTokenPair", catchAsync(UserController.refreshTokenPair));

module.exports = router;

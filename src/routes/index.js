"use strict";

const express = require("express");
const { authPermission } = require("../auth/auth.verify");
const catchAsync = require("../helpers/catchAsync");
const router = express.Router();

router.use("/user", require("./user.route"));
router.use("/apikey", require("./apikey.route"));

router.get("/testapi", catchAsync(authPermission("0000")), (req, res, next) => {
	return res.status(200).json(`[Authenticated]`);
});

module.exports = router;

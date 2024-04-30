"use strict";

const express = require("express");
const { checkApiKey, checkPermission } = require("../auth/checkAuth");
const router = express.Router();

router.use(checkApiKey, checkPermission('0000'));

router.use('/access', require('./access'));
router.use('/shop', require('./shop'));

router.get("/", (req, res, next) => {
	return res.status(200).json({
		msg: `Welcome to API`,
	});
});

module.exports = router;

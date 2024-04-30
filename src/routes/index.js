"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

router.use(apiKey);
router.use(permission('0000'));

router.use('/access', require('./access'));
router.use('/shop', require('./shop'));

router.get("/", (req, res, next) => {
	return res.status(200).json({
		msg: `Set up api router`,
	});
});

module.exports = router;

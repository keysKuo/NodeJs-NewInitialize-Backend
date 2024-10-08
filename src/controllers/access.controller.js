"use strict";

const AccessService = require("../services/access.service");

class AccessController {
	static signUp = async (req, res, next) => {
		return res.status(200).json(await AccessService.signUp({...req.body}));
	};
}

module.exports = AccessController;

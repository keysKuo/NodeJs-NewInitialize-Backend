"use strict";

const { SuccessResponse } = require("../middlewares/success.res");
const KeyStoreService = require("../services/keystore.service");

class TokenController {
	static createKeyStore = async (req, res, next) => {
		return new SuccessResponse({
			code: 201,
			message: `✔️ KeyStore Created!`,
			metadata: await KeyStoreService.createKeyStore({ ...req.body }),
		}).send(res);
	};
}

module.exports = TokenController;

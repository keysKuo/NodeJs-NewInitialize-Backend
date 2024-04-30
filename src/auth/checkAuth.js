"use strict";

const { BadRequestError } = require("../middlewares/error.response");
const ApiKeyService = require("../services/apikey.service");

const HEADER = {
	API_KEY: "x-api-key",
	AUTHORIZATION: "authorization",
};

const checkApiKey = async (req, res, next) => {
	const key = req.headers[HEADER.API_KEY]?.toString();
	if (!key) {
		throw new BadRequestError("Fobidden Error key");
	}

	const objKey = await ApiKeyService.findById(key);

	if (!objKey) {
		throw new BadRequestError("Fobidden Error objKey");
	}

	req.objKey = objKey;
	return next();
};

const checkPermission = (permission) => {
	return (req, res, next) => {
		if (!req.objKey.permissions) {
			return res.status(403).json({
				code: 403,
				msg: "Permission denied",
			});
		}

		const validPermission = req.objKey.permissions.includes(permission);
		if (!validPermission) {
			return res.status(403).json({
				code: 403,
				msg: "Permission denied",
			});
		}

		return next();
	};
};

const asyncHandler = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};

module.exports = { checkApiKey, checkPermission, asyncHandler };

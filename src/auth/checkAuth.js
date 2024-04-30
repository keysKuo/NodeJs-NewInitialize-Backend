"use strict";

const ApiKeyService = require("../services/apikey.service");

const HEADER = {
	API_KEY: "x-api-key",
	AUTHORIZATION: "authorization",
};

const checkApiKey = async (req, res, next) => {
	try {
		const key = req.headers[HEADER.API_KEY]?.toString();
		if (!key) {
			return res.status(403).json({
				code: 403,
				msg: "Fobidden Error",
			});
		}

		const objKey = await ApiKeyService.findById(key);

		if (!objKey) {
			return res.status(403).json({
				code: 403,
				msg: "Fobidden Error",
			});
		}

		req.objKey = objKey;
		return next();
	} catch (error) {
        return res.status(500).json({
            code: 500,
            status: 'error',
            msg: "ApiKey Error: " + err,
        });
    }
};

const checkPermission = (permission) => {
    return (req, res, next) => {
        if(!req.objKey.permissions) {
            return res.status(403).json({
				code: 403,
				msg: "Permission denied",
			});
        }

        const validPermission = req.objKey.permissions.includes(permission);
        if(!validPermission) {
            return res.status(403).json({
				code: 403,
				msg: "Permission denied",
			});
        }

        return next();
    }
}

module.exports = { checkApiKey, checkPermission };

"use strict";

const { BadRequestError } = require("../middlewares/error.res");
const ApiKeyService = require("../services/apikey.service");
const KeyStoreService = require("../services/keystore.service");
const { verifyJWT, matchUserId } = require("./auth.utils");

const HEADERS = {
	X_API_KEY: "x-api-key",
	X_CLIENT_ID: "x-client-id",
	AUTHORIZATION: "authorization",
	REFRESHTOKEN: "x-rtoken-id",
};

const authPermission = (permission) => {
	/*
        1. Check X-API-Key
        2. Find ApiKey from Database
        3. Check Permissions Includes?
        => Use APIKey to grant permission from API
    */
	return async (req, res, next) => {
		const key = req.headers[HEADERS.X_API_KEY]?.toString();

		if (!key) {
			throw new BadRequestError(`❌ Error: ApiKey not found!`);
		}

		const objKey = await ApiKeyService.findByKey(key);

		if (!objKey) {
			throw new BadRequestError(`❌ Error: Invalid ApiKey!`);
		}

		if (!objKey.permissions.includes(permission)) {
			throw new BadRequestError(`❌ Error: Permission Denied!`);
		}

		return next();
	};
};

const authToken = async (req, res, next) => {
	const clientId = req.headers[HEADERS.X_CLIENT_ID]?.toString();
	if (!clientId) {
		throw new BadRequestError(`❌ Error: ClientId Not Found!`, 404);
	}

	const keyStore = await KeyStoreService.findByUser(clientId);

	// If refreshToken? then handleRefreshToken else handleAccessToken
	const refreshToken = req.headers[HEADERS.REFRESHTOKEN]?.toString();
	if (refreshToken) {
		// Check if clientId same with userId decoded by refreshToken
		if (matchUserId(clientId, refreshToken, keyStore.privateKey) == false) {
			throw new BadRequestError(`❌ Error: JWT Verified Error!`, 500);
		}
		
		req.keyStore = keyStore;
		req.userId = clientId;
		req.refreshToken = refreshToken;
		return next();
	} else {
		const accessToken = req.headers[HEADERS.AUTHORIZATION]?.toString();
		if (!accessToken) {
			throw new BadRequestError(`❌ Error: AccessToken Not Found!`, 404);
		}

		if (matchUserId(clientId, accessToken, keyStore.publicKey) == false) {
			throw new BadRequestError(`❌ Error: JWT Verified Error!`, 500);
		}

		req.keyStore = keyStore;
		req.userId = clientId;
		return next();
	}
};

module.exports = {
	authPermission,
	authToken,
};

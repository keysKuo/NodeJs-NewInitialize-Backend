"use strict";

const { BadRequestError } = require("../middlewares/error.res");
const ApiKeyService = require("../services/apikey.service");
const KeyStoreService = require("../services/keystore.service");
const { verifyJWT } = require("./auth.utils");

const HEADERS = {
	X_API_KEY: "x-api-key",
	X_CLIENT_ID: "x-client-id",
	AUTHORIZATION: "authorization",
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
	/*
        1. Check X-Client-ID
        2. Find accessToken from Database
        3. Verify accessToken
        4. Check User
        5. Check Token By UserId
        => Use accessToken to Authenticate User Actions
    */

	const clientId = req.headers[HEADERS.X_CLIENT_ID]?.toString();

	if (!clientId) {
		throw new BadRequestError(`❌ Error: ClientId Not Found!`, 404);
	}

	const keyStore = await KeyStoreService.findByUser(clientId);

	const accessToken = req.headers[HEADERS.AUTHORIZATION]?.toString();

	if (!accessToken) {
		throw new BadRequestError(`❌ Error: AccessToken Not Found!`, 404);
	}

	const decode = await verifyJWT(accessToken, keyStore.publicKey);
	
	if (!decode) {
		throw new BadRequestError(`❌ Error: Invalid Signature!`, 500);
	}

	console.log(decode)
	if (clientId !== decode.userId) {
		throw new BadRequestError(`❌ Error: ClientId Invalid!`, 300);
	}

	req.keyStore = keyStore;
	return next();
};

module.exports = {
	authPermission,
	authToken,
};

"use strict";
const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKeyObject, privateKey) => {
	try {
		const accessToken = await JWT.sign(payload, privateKey, {
			algorithm: "RS256",
			expiresIn: "2 days",
		});

		const refreshToken = await JWT.sign(payload, privateKey, {
			algorithm: "RS256",
			expiresIn: "7 days",
		});

		JWT.verify(accessToken, publicKeyObject, (err, decode) => {
			if (err) {
				console.error(`Error verified: ` + err);
			} else {
				console.log(`🗝️  Auth Token Verified: ` + decode);
			}
		});

		return { accessToken, refreshToken };
	} catch (error) {}
};

module.exports = { createTokenPair };

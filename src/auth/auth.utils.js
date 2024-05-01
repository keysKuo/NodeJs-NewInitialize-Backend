"use strict";
const JWT = require("jsonwebtoken");
const crypto = require('crypto');

const createTokenPair = async (payload, publicKey, privateKey) => {
	const accessToken = await JWT.sign(payload, publicKey, {
		// algorithm: "RS256",
		expiresIn: "2 days",
	});

	const refreshToken = await JWT.sign(payload, privateKey, {
		// algorithm: "RS256",
		expiresIn: "7 days",
	});

	await JWT.verify(accessToken, publicKey, (err, decode) => {
		if (err) {
			console.error(`Error verified: ` + err);
		} else {
			console.log(`✔️  AccessToken Verified: ` + decode);
		}
	});

	return { accessToken, refreshToken };
};

const generateKeyPair = () => {
	
	// Asymmetric KeyPair
	// const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
	// 	modulusLength: 4096,
	// 	publicKeyEncoding: {
	// 		// *
	// 		type: "pkcs1", // public key cryptography standard 1
	// 		format: "pem",
	// 	},
	// 	privateKeyEncoding: {
	// 		// *
	// 		type: "pkcs1", // private key cryptography standard 1
	// 		format: "pem",
	// 	},
	// });

	// Simple KeyPair
	const privateKey = crypto.randomBytes(64).toString('hex');
	const publicKey = crypto.randomBytes(64).toString('hex');

	return { privateKey, publicKey };
};

module.exports = { createTokenPair, generateKeyPair };

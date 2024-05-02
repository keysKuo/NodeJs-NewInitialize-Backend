"use strict";
const JWT = require("jsonwebtoken");
const crypto = require('crypto');
const { BadRequestError } = require("../middlewares/error.res");

const createTokenPair = async (payload, publicKey, privateKey) => {
	const accessToken = await JWT.sign(payload, publicKey, {
		// algorithm: "RS256",
		expiresIn: "2 days",
	});

	const refreshToken = await JWT.sign(payload, privateKey, {
		// algorithm: "RS256",
		expiresIn: "7 days",
	});

	await verifyJWT(accessToken, publicKey)
	
	return { accessToken, refreshToken };
};

const generateKeyPair = () => {
	
	// Regular KeyPair
	const privateKey = crypto.randomBytes(64).toString('hex');
	const publicKey = crypto.randomBytes(64).toString('hex');

	// Asymmetric KeyPair
	/*
	const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			// *
			type: "pkcs1", // public key cryptography standard 1
			format: "pem",
		},
		privateKeyEncoding: {
			// *
			type: "pkcs1", // private key cryptography standard 1
			format: "pem",
		},
	});
	*/
	return { privateKey, publicKey };
};

const verifyJWT = async (token, secretKey) => {
	return await JWT.verify(token, secretKey, (err, decode) => {
		if (err) {
			throw new BadRequestError(`❌ Error: Invalid Signature!`, 300);
		} else {
			console.log(`✔️  JWT Verified!`);
			return decode;
		}
	});
}	

module.exports = { createTokenPair, generateKeyPair, verifyJWT };

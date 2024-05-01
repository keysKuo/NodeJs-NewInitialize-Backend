"use strict";

const { BadRequestError } = require("../middlewares/error.res");
const tokenModel = require("../models/token.model");

class TokenService {
	static createToken = async ({ userId, publicKey, privateKey }) => {
		const newToken = await tokenModel.create({
			user: userId,
			publicKey,
			privateKey,
		});

        if(!newToken) {
            throw new BadRequestError(`❌ Error: TokenService.createToken`);
        }

        return newToken;
	};
}

module.exports = TokenService;

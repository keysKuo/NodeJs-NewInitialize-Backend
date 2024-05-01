"use strict";

const { generateKeyPair, createTokenPair } = require("../auth/auth.utils");
const { BadRequestError } = require("../middlewares/error.res");
const userModel = require("../models/user.model");
const { filterData } = require("../utils");
const TokenService = require("./token.service");
const bcrypt = require('bcrypt');


const UserRole = {
	CUSTOMER: "CUSTOMER",
	ADMIN: "ADMIN",
};

class UserService {
	static register = async ({ fullname, email, password, phone }) => {
		const holderUser = await userModel.findOne({ email }).lean();

		if (holderUser) {
			throw new BadRequestError(`❌ Error: User already existed!`);
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = await userModel.create({
			fullname,
			email,
			password: passwordHash,
			phone,
            roles: [UserRole.ADMIN]
		});

		if (!newUser) {
			throw new BadRequestError(`❌ Error: Created user fail!`);
		}

		// Generate KeyPair
		const { publicKey, privateKey } = generateKeyPair();

		if (!publicKey || !privateKey) {
			throw new BadRequestError(`❌ Error: Generated keyPair fail!`);
		}

		console.log(
			`✔️  Generated publicKey & privateKey: ` + { publicKey, privateKey }
		);

		// Stored KeyToken to Db
		const storedToken = await TokenService.createToken({
			userId: newUser._id,
			publicKey,
			privateKey,
		});

		console.log(`✔️  Stored keyToken: ` + { storedToken });

		// Create accessToken & refreshToken
		const { accessToken, refreshToken } = await createTokenPair(
			{ userId: newUser._id, email },
			publicKey,
			privateKey
		);

        if(!accessToken || !refreshToken) {
            throw new BadRequestError(`❌ Error: Create accessToken or refreshToken fail!`);
        }

		console.log(`✔️  Created accessToken & refreshToken: `, {
			accessToken,
			refreshToken,
		});

        return {
            status: 'success',
            code: 201,
            metadata: {
                user: filterData({
                    object: newUser,
                    fields: ['_id', 'fullname', 'email', 'phone', 'status', 'role']
                }),
                tokens: { accessToken, refreshToken }
            }
        }
	};
}

module.exports = UserService;

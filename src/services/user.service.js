"use strict";

const {
	generateKeyPair,
	createTokenPair,
	verifyJWT,
} = require("../auth/auth.utils");
const { BadRequestError } = require("../middlewares/error.res");
const userModel = require("../models/user.model");
const KeyStoreService = require("./keystore.service");
const bcrypt = require("bcrypt");

const UserRole = {
	CUSTOMER: "CUSTOMER",
	ADMIN: "ADMIN",
};

class UserService {
	static refreshTokenPair = async (refreshToken) => {
		/*
			1. Check if tokenPair refreshed or not ? if yes break both
			2. Verify JWT old tokenPair
			3. Refresh new tokenPair for user
			=> Summary: RefreshToken only used once
		*/

		const refreshedKeyStore = await KeyStoreService.deleteRefreshedKeyStore(
			refreshToken
		);

		if (refreshedKeyStore) {
			throw new BadRequestError(`❌ Error: Abnormally Behavior!`, 300);
		}

		const holderKeyStore = await KeyStoreService.findByRefreshToken(
			refreshToken
		);

		const { userId, email } = await verifyJWT(
			refreshToken,
			holderKeyStore.privateKey
		);
		console.log(email);

		const foundUser = await userModel.findOne({ email });

		if (!foundUser) {
			throw new BadRequestError(`❌ Error: User not exists!`, 404);
		}

		const newTokenPair = await createTokenPair(
			{ userId, email },
			holderKeyStore.publicKey,
			holderKeyStore.privateKey
		);

		holderKeyStore.refreshToken = newTokenPair.refreshToken;
		holderKeyStore.refreshTokensUsed = [...holderKeyStore.refreshTokensUsed, refreshToken]
		await holderKeyStore.save();

		return {
			user: { userId, email },
			newTokenPair,
		};
	};

	static logout = async (keyStoreId) => {
		const delkey = await KeyStoreService.deleteKeyStoreById(keyStoreId);

		if (!delkey) {
			throw new BadRequestError(`❌ Error: Delete KeyStore Fail!`, 500);
		}

		return delkey;
	};

	static login = async ({ email, password }) => {
		const foundUser = await userModel.findOne({ email }).lean();

		if (!foundUser) {
			throw new BadRequestError(`❌ Error: User Not Exists!`, 404);
		}

		const isMatch = bcrypt.compare(password, foundUser.password);

		if (!isMatch) {
			throw new BadRequestError(`❌ Error: Authentication Error!`, 300);
		}

		// Generate KeyPair
		const { publicKey, privateKey } = generateKeyPair();

		if (!publicKey || !privateKey) {
			throw new BadRequestError(`❌ Error: Generated KeyPair Fail!`);
		}

		// Create accessToken & refreshToken
		const { accessToken, refreshToken } = await createTokenPair(
			{ userId: foundUser._id, email },
			publicKey,
			privateKey
		);

		if (!accessToken || !refreshToken) {
			throw new BadRequestError(
				`❌ Error: Create accessToken or refreshToken fail!`
			);
		}

		// Stored KeyToken to Db
		await KeyStoreService.createKeyStore({
			userId: foundUser._id,
			publicKey,
			privateKey,
			refreshToken,
		});

		return {
			user: foundUser,
			tokens: { accessToken, refreshToken },
		};
	};

	static register = async ({ fullname, email, password, phone }) => {
		const holderUser = await userModel.findOne({ email }).lean();

		if (holderUser) {
			throw new BadRequestError(`❌ Error: User already existed!`, 300);
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = await userModel.create({
			fullname,
			email,
			password: passwordHash,
			phone,
			roles: [UserRole.ADMIN],
		});

		if (!newUser) {
			throw new BadRequestError(`❌ Error: Created user fail!`);
		}

		return {
			user: newUser,
		};
	};
}

module.exports = UserService;

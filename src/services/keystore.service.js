"use strict";

const { BadRequestError } = require("../middlewares/error.res");
const keystoreModel = require("../models/keystore.model");

class KeyStoreService {
	static createKeyStore = async ({
		userId,
		publicKey,
		privateKey,
		refreshToken,
	}) => {
		const filter = { user: userId };
		const update = {
			publicKey,
			privateKey,
			refreshTokensUsed: [],
			refreshToken,
		};
		const options = { upsert: true, new: true };

		const newKeyStore = await keystoreModel.findOneAndUpdate(
			filter,
			update,
			options
		);

		if (!newKeyStore) {
			throw new BadRequestError(`❌ Error: KeyStoreService.createToken`);
		}

		return newKeyStore;
	};

	static findByUser = async (userId) => {
		const keyStore = await keystoreModel.findOne({ user: userId }).lean();

		if (!keyStore) {
			throw new BadRequestError(`❌ Error: KeyStore Not Found!`, 404);
		}

		return keyStore;
	};

	static findByRefreshToken = async (refreshToken) => {
		const keyStore = await keystoreModel.findOne({ refreshToken });

		if (!keyStore) {
			throw new BadRequestError(`❌ Error: KeyStore Not Found!`, 404);
		}

		return keyStore;
	}

	static deleteKeyStoreById = async (keyStoreId) => {
		return await keystoreModel.deleteOne({ _id: keyStoreId });
	};

	static deleteRefreshedKeyStore = async (refreshToken) => {
		return await keystoreModel.findOneAndDelete({ refreshTokensUsed: refreshToken}).lean();
	}
}

module.exports = KeyStoreService;

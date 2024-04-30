"use strict";
const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const shopModel = require("../models/shop.model");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const RoleShop = {
	SHOP: "SHOP",
	WRITER: "WRITER",
	EDITOR: "EDITOR",
	ADMIN: "ADMIN",
};

class AccessService {
	static signUp = async ({ name, email, password }) => {
		try {
			// Check shop existed or not
			const holderShop = await shopModel.findOne({ email }).lean();

			if (holderShop) {
				return {
					code: 300,
					status: "error",
					msg: "Shop already exists",
				};
			}

			const passwordHash = await bcrypt.hash(password, 10);
			const newShop = await shopModel.create({
				name,
				email,
				password: passwordHash,
				roles: [RoleShop.SHOP],
			});

			/*
				Khúc này hơi chết não nên sẽ docs bằng tiếng việt
				Lưu ý là phải có phần options về publicKeyEncoding và privateKeyEncoding để nó mã hóa thành đúng định dạng

				(Step1) Generate publicKey & privateKey
					+ function: generateKeytPairSync từ npm crypto
					+ params: "rsa" - algorithm (sha256,sha2,...)
								publicKeyEncoding, privateKeyEncoding - định dạng mã hóa cho các keys

				(Step2) KeyTokenService.createKeyToken nhằm lưu PublicKey dưới dạng string vào database
					+ params: userId , publicKey (original generated)

				(Step3) Tạo tokenPair(accessToken, refreshToken) với JWT
					- problems: Ở đây không hiểu vì sao publicKey lại phải là object trong khi privateKey thì String
					+ params: payload - data để mã hóa
								publicKeyObject - publicKey dưới dạng Object
								privateKey
			*/
			if (newShop) {
				/* Step 1 */
				const { privateKey, publicKey } = crypto.generateKeyPairSync(
					"rsa",
					{
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
					}
				);

				console.log(
					`✔️  Generated publicKey & privateKey: ` +
						{ publicKey, privateKey }
				);

				/* Step 2 */
				const storedKeyToken = await KeyTokenService.createKeyToken({
					userId: newShop._id,
					publicKey,
					privateKey
				});
				
				console.log(
					`✔️  Stored keyToken: ` + storedKeyToken
				);

				/* Step 3 */
				const tokens = await createTokenPair(
					{ userId: newShop._id, email },
					publicKey,
					privateKey
				);
				console.log(
					`✔️  Created accessToken & refreshToken: `,
					tokens
				);

				return {
					code: 200,
					status: "success",
					metadata: {
						shop: getInfoData({
							object: newShop,
							fields: ["_id", "name", "email"],
						}),
						tokens,
					},
				};
			}

			return {
				code: 404,
				status: "error",
				metadata: null,
			};
		} catch (error) {
			return {
				code: 500,
				msg: error.message,
				status: "error",
			};
		}
	};
}

module.exports = AccessService;

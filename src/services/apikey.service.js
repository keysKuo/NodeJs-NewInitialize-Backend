"use strict";
const crypto = require("crypto");
const apikeyModel = require("../models/apikey.model");

class ApiKeyService {
	static create = async () => {
		try {
			const newKey = await apikeyModel.create({
				key: crypto.randomBytes(64).toString("hex"),
				permissions: ["0000"],
			});

			if (!newKey) {
				return res.status(403).json({
					code: 403,
					msg: "Key not found",
				});
			}

			return res.status(201).json({
				code: 201,
				msg: "Created ApiKey",
				metadata: newKey,
			});
		} catch (error) {
			return res.status(500).json({
				code: 500,
				msg: "Create ApiKey Error: " + err,
			});
		}
	};

	static findById = async (key) => {
		return await apikeyModel.findOne({ key, status: true }).lean();
	};
}

module.exports = ApiKeyService;

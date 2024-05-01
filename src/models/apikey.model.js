"use strict";

const { model, Schema, Types } = require("mongoose");

const ApiKey = new Schema(
	{
		user: { type: Types.ObjectId, ref: "User", required: true },
		key: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		status: { type: Boolean, default: true },
		permissions: {
			type: [String],
			required: true,
			enum: ["0000", "1111", "2222"],
			default: [],
		},
        expiry: { type: Date, default: new Date()}
	},
	{
		timestamps: true,
	}
);

module.exports = model("ApiKey", ApiKey);

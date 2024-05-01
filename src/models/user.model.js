"use strict";

const { model, Schema } = require("mongoose");

const User = new Schema(
	{
		fullname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String, required: true },
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "inactive",
		},
		verify: { type: Boolean, default: false },
		roles: { type: Array, default: [] },
	},
	{
		timestamps: true,
	}
);

module.exports = model("User", User);

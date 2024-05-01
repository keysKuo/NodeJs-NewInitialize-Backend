"use strict";

const { model, Schema, Types } = require("mongoose");

const Token = new Schema({
	user: { type: Types.ObjectId, ref: "User", required: true },
	publicKey: { type: String, required: true },
	privateKey: { type: String, required: true },
	refreshTokens: { type: Array, default: [] },
}, {
    timestamps: true
});

module.exports = model('Token', Token);

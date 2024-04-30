"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KeyToken = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
	publicKey: { type: String, required: true },
	refreshToken: { type: Array, default: [] },
}, {
    timestamps: true
});

module.exports = mongoose.model('KeyToken', KeyToken);
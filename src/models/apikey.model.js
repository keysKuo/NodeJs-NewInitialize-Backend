"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApiKey = new Schema({
	key: { type: String, required: true, unique: true },
	status: { type: Boolean, default: true },
    permissions: { type: [String], required: true, enum: ['0000', '1111', '2222']}
}, {
    timestamps: true
});

module.exports = mongoose.model('ApiKey', ApiKey);
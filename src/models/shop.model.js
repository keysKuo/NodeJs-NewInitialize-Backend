"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shop = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	status: { type: String, enum: ["active", "inactive"], default: "inactive" },
	verify: { type: Schema.Types.Boolean, default: false },
	role: { type: Array, default: [] },
}, {
	timestamps: true
});

module.exports = mongoose.model("Shop", Shop);

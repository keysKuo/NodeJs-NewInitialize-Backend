"use strict";

const mongoose = require("mongoose");
const config = require('../configs/config.mongodb');
const { countConnect } = require("../helpers/check.connect");

class Database {
	constructor() {
		this.connect();
	}

	// connect method
	connect(type = "mongodb") {
		if (1 === 1) {
			mongoose.set("debug", true);
			mongoose.set("debug", { color: true });
		}

		mongoose
			.connect(config.database_url, { maxPoolSize: 100 })
			.then(() => {
				console.log(`⭐ Connected ${config.database_url}`);
				countConnect();
			})
			.catch((err) => console.log(`Error: ${err}`));
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}

		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;

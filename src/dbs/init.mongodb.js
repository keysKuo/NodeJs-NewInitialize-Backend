"use strict";

const mongoose = require("mongoose");
const { db: { host, name, port }} = require('../configs/config.mongodb');

const connectString = `mongodb://${host}:${port}/${name}`;
const { countConnect } = require("../helpers/check.connect");

class Database {
	constructor() {
		this.connect();
	}

	// connect method
	connect(type = "mongodb") {
		// if (1 === 1) {
		// 	mongoose.set("debug", true);
		// 	mongoose.set("debug", { color: true });
		// }

		mongoose
			.connect(connectString, { maxPoolSize: 100 })
			.then(() => {
				console.log(`⭐ Connected ${connectString}`);
				countConnect();
			})
			.catch((err) => console.error('🐞 Error: ' + err));
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

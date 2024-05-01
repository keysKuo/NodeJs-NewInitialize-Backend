"use strict";
require('dotenv').config();
// lv0

const dev = {
	app: {
		port: process.env.DEV_PORT || 2405,
	},
	db: {
		host: process.env.DEV_DB_HOST || "localhost",
		port: process.env.DEV_DB_PORT || 27017,
		name: process.env.DEV_DB_NAME || "dbDev",
	},
};

// lv1

const production = {
	app: {
		port: process.env.PROD_PORT || 5000,
	},
	db: {
		host: process.env.PROD_DB_HOST || "localhost",
		port: process.env.PROD_DB_HOST || 27017,
		name: process.env.PROD_DB_HOST || "dbProduction",
	},
};

const config = { dev, production };
const env = process.env.NODE_ENV?.trim() || "dev";

module.exports = config[env];

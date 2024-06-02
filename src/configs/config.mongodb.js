"use strict";

const dev = {
	port: 2405,
	database_url: `mongodb://127.0.0.1:27017/EzSound_Dev`,
};

const test = {
	port: process.env.PORT || 2406,
	database_url: process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/EzSound_Test`,
};

const production = {
	port: process.env.PORT || 2407,
	database_url: process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/EzSound_Production`,
};

const config = { dev, production, test };
const env = process.env.NODE_ENV?.trim() || "dev";

module.exports = config[env];

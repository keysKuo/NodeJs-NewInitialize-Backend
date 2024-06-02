require('dotenv').config();

const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
const { checkOverload } = require("./helpers/check.connect");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const expressSession = require('express-session');


app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'nkeyskuo SUDTECHNOLOGY',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

require("./dbs/init.mongodb"); // Singleton - A method or class that only construct once
checkOverload();

// init routers
app.get("/", (req, res, next) => {
	return res.status(200).json({
		msg: "Server Initialization",
	});
});

// handling error

module.exports = app;

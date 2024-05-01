require("dotenv").config();

const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
const { checkOverload } = require("./helpers/check.connect");
const cors = require("cors");

// console.log(process.env);
// init middlewares

/* 
    Morgan - Request Access Logs
    5 modes:
        dev - only response status with request url
        combined - full access log
        common - lack of resource
        short - short notification
        tiny - shortest notification
*/
app.use(morgan("dev"));

/*
    Helmet - Protect server from headers scanning
*/
app.use(helmet());

/*
    Compression - Reduce metadata response by compressing
*/
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init database
/*
    1. Old Connection cons ? - [ @/dbs/init.mongodb.lv0 ] 
    2. New Connection - why recommended?  - [ Singleton connection @/dbs/init.mongodb ]
    3. Check number of connection to system - [ @/helpers/check.connect - countConnect ]
    4. Notificate when server overload ?  - [ @/helpers/check.connect - checkOverload ]
    5. disConnect() every single connect - should or not ? [ No, its automatically ]
    6. What is poolSize ? [ max number of connections to database ]
    7. What happened when over connecting poolSize ? [ if overload, the next will wait in queue ]
*/
require("./database/init.mongodb"); // Singleton - A method or class that only construct once
checkOverload();

// init routers

app.use("/v1/api", require("./routes"));

app.get("/", (req, res, next) => {
	return res.status(200).json({
		msg: "Server Initialization",
	});
});

// handling error

app.use((req, res, next) => {
	const error = new Error("❌ 404 Not Found");
	error.status = 404;

	next(error);
});

app.use((err, req, res, next) => {
	const statusCode = err.status || 500;
	return res.status(statusCode).json({
		success: false,
		code: statusCode,
		message: err.message || "❌ Internal Server Error",
	});
});

module.exports = app;

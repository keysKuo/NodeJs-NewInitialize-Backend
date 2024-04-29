const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

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
    Compression - Reduce metadata response 
*/
app.use(compression());



// init database



// init routers
app.get("/", (req, res, next) => {
	return res.status(200).json({
		msg: "Server Initialization",
	});
});

// handling error

module.exports = app;

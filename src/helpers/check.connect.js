"use strict";

const mongoose = require("mongoose");
const os = require('os');
const process = require('process');
const _SECONDS = 500000;

// count connect
const countConnect = () => {
	const numConnections = mongoose.connections.length;
	console.log(`🔥 Number of connections: ${numConnections}`);
};

// check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length; // number of connections
        const numCores = os.cpus().length; // number of CPU cores
        const memoryUsage = process.memoryUsage().rss; // usage memory

        // Example maximum number of connections based on number of cores
        const maxConnections = numCores * 5;

        console.log(`Active connections: ${numConnections}`);
        console.log(`Number of cores: ${numCores}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

        if(numConnections > maxConnections) {
            console.error(`❌ Connection overload detected - ${numConnections} vs ${maxConnections}`);
        }
    }, _SECONDS); // Monitor every 5 seconds
}

module.exports = { countConnect, checkOverload };

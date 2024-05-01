## Refactor Design Pattern

1.  Reorganize folder structure


    -   auth/       ->  Provide utitlities and Verification handler in Authentication
    -   clients/    ->  Restful Testing API gateways
    -   configs/    ->  Setup configurations internal system
    -   utils/      ->  Provide reusable utilities which using extensively
    -   helpers/    ->  Provide small functions which helps system run naturally
    -   ...(MVC model)


2.  Implement Singleton Design Pattern


    ```javascript
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
                .connect(connectString, { maxPoolSize: 100 }) // replace connectionString
                .then(() => {
                    console.log(`⭐ Connected ${connectString}`);
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
    ```


3.  Implement Error Handling with catchAsync


    ```javascript
    const catchAsync = (fn) => {
        return (req, res, next) => {
            fn(req, res, next).catch(next);
        };
    };
    ```

4.  Enhance Security using Symmetric Key Pairs


    ```javascript
    const crypto = require('node:crypto'); // Node 19+

    const generateKeyPair = () => {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                // *
                type: "pkcs1", // public key cryptography standard 1
                format: "pem",
            },
            privateKeyEncoding: {
                // *
                type: "pkcs1", // private key cryptography standard 1
                format: "pem",
            },
        });

        return { privateKey, publicKey };
    };
    ```

5.  Authenticate Permissions using API Keys


    ```javascript
    const HEADERS = {
        API_KEY: 'x-api-key',
        AUTHORIZATION: 'Authorization'
    };

    const authPermission = (permission) => {
        return async (req, res, next) => {
            const key = req.headers[HEADERS.API_KEY]?.toString();

            if(!key) {
                throw new BadRequestError(`❌ Error: ApiKey not found!`);
            }

            const objKey = await ApiKeyService.findByKey(key); // db.findOne({key})

            if(!objKey) {
                throw new BadRequestError(`❌ Error: Invalid ApiKey!`);
            }

            if(!objKey.permissions.includes(permission)) {
                throw new BadRequestError(`❌ Error: Permission Denied!`);
            }

            return next();
        };
    };
    ```


6.  Seperate Environment Variables for Development and Production


    ```javascript
    require('dotenv').config();

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
    ```


7.  Overload Detection by Memory Usage


    ```javascript
    const mongoose = require("mongoose");
    const os = require('os');
    const process = require('process');
    const _SECONDS = 500000;

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
        }, _SECONDS); // Monitor every 500 seconds
    }
    ```


### Built With

To run this project, make sure that your environment have all of these frameworks/libraries:

-   [![Nodejs][Node.js]][Node-url]
-   [![ExpressJS][Express.js]][Express-url]
-   [![MongoDB][MongoDB]][MongoDB-url]

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/keysKuo/NodeJs-NewInitialize-Backend.git
    ```
2. Install NPM packages
    ```sh
    npm install && npm install nodemon --save-dev
    ```
3. Run the source code
    ```sh
    npm run dev
    ```

    > **🚀 Server ready on port <span style="color: #71B190">2405</span>**
    >
    > **⭐ Connected mongodb://localhost:27017/EzPractice**
    >
    > **🔥 Number of connections: 1**

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

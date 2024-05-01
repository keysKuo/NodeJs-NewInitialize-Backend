'use strict';

const { BadRequestError } = require("../middlewares/error.res");
const ApiKeyService = require("../services/apikey.service");

const HEADERS = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'Authorization'
}

const authPermission = (permission) => {
    return async (req, res, next) => {
        const key = req.headers[HEADERS.API_KEY]?.toString();

        if(!key) {
            throw new BadRequestError(`❌ Error: ApiKey not found!`);
        }

        const objKey = await ApiKeyService.findByKey(key);

        if(!objKey) {
            throw new BadRequestError(`❌ Error: Invalid ApiKey!`);
        }

        if(!objKey.permissions.includes(permission)) {
            throw new BadRequestError(`❌ Error: Permission Denied!`);
        }

        return next();
    };
};

module.exports = {
    authPermission
}
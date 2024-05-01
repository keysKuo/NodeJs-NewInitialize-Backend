'use strict';

const { SuccessResponse } = require("../middlewares/success.res");
const ApiKeyService = require("../services/apikey.service");

class ApiKeyController {

    static createApiKey = async (req, res, next) => {
        return new SuccessResponse({
            code: 201,
            message: `✔️  ApiKey Created!`,
            metadata: await ApiKeyService.createApiKey({...req.body})
        }).send(res);
    }

    static deleteApiKey = async (req, res, next) => {
        return new SuccessResponse({
            code: 200,
            message: `✔️  ApiKey Deleted!`,
            metadata: await ApiKeyService.deleteApiKey(req.params.userId)
        }).send(res);
    }
}

module.exports = ApiKeyController;
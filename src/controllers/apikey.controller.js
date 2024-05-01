'use strict';

const ApiKeyService = require("../services/apikey.service");

class ApiKeyController {

    static createApiKey = async (req, res, next) => {
        return res.status(200).json(await ApiKeyService.createApiKey({...req.body}));
    }
}

module.exports = ApiKeyController;
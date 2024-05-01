'use strict';

const { BadRequestError } = require("../middlewares/error.res");
const apikeyModel = require("../models/apikey.model");
const crypto = require('crypto');

class ApiKeyService {
    
    static createApiKey = async ({ userId, keyName = 'Default ApiKey', permissions = ['0000']}) => {
        const holderKey = await apikeyModel.findOne({user: userId}).lean();

        if(holderKey) {
            throw new BadRequestError(`❌ Error: User already had ApiKey`);
        }

        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const newApiKey = await apikeyModel.create({
            user: userId,
            key: crypto.randomBytes(64).toString('hex'),
            name: keyName,
            permissions
        })

        if(!newApiKey) {
            throw new BadRequestError(`❌ Error: Created newApiKey fail!`);
        }

        return newApiKey;
    }

    static findByKey = async (key) => {
        return await apikeyModel.findOne({key, status: true}).lean();
    }
};

module.exports = ApiKeyService;
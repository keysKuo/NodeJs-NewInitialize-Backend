'use strict';

const { BadRequestError } = require("../middlewares/error.res");
const apikeyModel = require("../models/apikey.model");
const crypto = require('crypto');

class ApiKeyService {
    
    static createApiKey = async ({ userId, keyName = 'Default ApiKey', permissions = ['0000']}) => {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const filter = { user: userId };

        const update = {
            user: userId,
            key: crypto.randomBytes(64).toString('hex'),
            name: keyName,
            expiry: nextMonth,
            permissions
        };

        const options = { upsert: true, new: true };

        const newApiKey = await apikeyModel.findOneAndUpdate(filter, update, options)

        if(!newApiKey) {
            throw new BadRequestError(`❌ Error: Created newApiKey fail!`);
        }

        return newApiKey;
    }

    static findByKey = async (key) => {
        const apiKey = await apikeyModel.findOne({key, status: true}).lean();

        if(!apiKey) {
            throw new BadRequestError(`❌ Error: ApiKey not found!`);
        }

        return apiKey;
    }

    static deleteApiKey = async (userId) => {
        const deletedApiKey =  await apikeyModel.findOneAndDelete({user: userId}).lean();

        if(!deletedApiKey) {
            throw new BadRequestError(`❌ Error: ApiKey not found!`);
        }

        return deletedApiKey;
    }
};

module.exports = ApiKeyService;
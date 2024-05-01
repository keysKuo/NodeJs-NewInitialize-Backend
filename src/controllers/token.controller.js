'use strict';

const { SuccessResponse } = require("../middlewares/success.res");
const TokenService = require("../services/token.service");

class TokenController {

    static createToken = async (req, res, next) => {
        return new SuccessResponse({
            code: 201,
            message: `✔️  Token Created!`,
            metadata: await TokenService.createToken({...req.body})
        }).send(res);
    }
}

module.exports = TokenController
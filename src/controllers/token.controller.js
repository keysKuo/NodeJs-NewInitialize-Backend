'use strict';

const TokenService = require("../services/token.service");

class TokenController {

    static createToken = async (req, res, next) => {
        return await res.status(200).json(await TokenService.createToken({...req.body}));
    }
}

module.exports = TokenController
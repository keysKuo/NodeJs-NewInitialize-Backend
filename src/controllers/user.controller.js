'use strict';

const { SuccessResponse } = require("../middlewares/success.res");
const UserService = require("../services/user.service");

class UserController {

    static register = async (req, res, next) => {
        return new SuccessResponse({
            code: 201,
            message: `✔️  User registered!`,
            metadata: await UserService.register({...req.body})
        }).send(res);
    }
}

module.exports = UserController;


'use strict';

const UserService = require("../services/user.service");

class UserController {

    static register = async (req, res, next) => {
        return res.status(200).json(await UserService.register({...req.body}));
    }
}

module.exports = UserController;


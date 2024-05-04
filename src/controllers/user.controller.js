'use strict';

const { SuccessResponse } = require("../middlewares/success.res");
const UserService = require("../services/user.service");

class UserController {

    static refreshTokenPair = async (req, res, next) => {
        return new SuccessResponse({
            code: 200,
            message: `✔️ Refresh New TokenPair!`,
            metadata: await UserService.refreshTokenPairV2({
                keyStore: req.keyStore,
                userId: req.userId,
                refreshToken: req.refreshToken
            })
        }).send(res);
    }

    static logout = async (req, res, next) => {
        return new SuccessResponse({
            code: 200,
            message: `✔️ Logout Success!`,
            metadata: await UserService.logout(req.keyStore._id)
        }).send(res);
    }

    static login = async (req, res, next) => {
        return new SuccessResponse({
            code: 200,
            message: `✔️ Login Success!`,
            metadata: await UserService.login({...req.body})
        }).send(res);
    }

    static register = async (req, res, next) => {
        return new SuccessResponse({
            code: 201,
            message: `✔️ User registered!`,
            metadata: await UserService.register({...req.body})
        }).send(res);
    }
}

module.exports = UserController;


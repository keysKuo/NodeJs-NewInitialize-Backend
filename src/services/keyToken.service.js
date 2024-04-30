'use strict';

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {

    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString(); // parse to string
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey: publicKeyString
                // refreshToken: [default]
            })

            // Return publicKeyString of tokens if create successfully
            // Ở đây không dc được return publicKeyString mà phải return data đã store vào mongodb
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenService;
'use strict';

const JWT = require('jsonwebtoken');
const Config = require('../config');

function generateToken (id) {
    return JWT.sign({
        id,
    }, Config.JWT_SECRET, {
        expiresIn: Config.JWT_COOKIE_EXPIRATION,
    });
}

module.exports = generateToken;

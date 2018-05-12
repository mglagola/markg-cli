const Hoek = require('hoek');
const isNil = require('lodash/isNil');
const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const User = require('../schemata/user');

const validateJWTCredentials = async (decoded, request) => {
    try {
        const user = await User.findById(decoded.id).lean()
        const credentials = omit(user, 'password');
        credentials.scope = ['user', `user-${credentials.id}`];
        return { isValid: !isEmpty(user), credentials };
    } catch (error) {
        return { isValid: false };
    }
};

function errorFunc ({ errorType, message, scheme }) {
    const attributes = {
        error: 'Invalid token',
        invalid_token: true,
    };
    return {
        errorType,
        message,
        scheme,
        attributes,
    };
}

function generateDefaultOptions () {
    return {
        validate: validateJWTCredentials,
        errorFunc,
        verifyOptions: { algorithms: [ 'HS256' ] },
    };
}

exports.register = function (server, options) {
    const config = Hoek.merge(generateDefaultOptions(), options);
    server.auth.strategy('jwt', 'jwt', config);
};

exports.pkg = {
    name: 'Auth',
    version: '1.0.0',
};

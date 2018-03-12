'use strict';

const Hoek = require('hoek');
const isNil = require('lodash/isNil');
const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const User = require('../../schemata/user');

const validateJWTCredentials = (knex) => (decoded, request, callback) => {
    User.findById(decoded.id)
        .lean()
        .then(user => {
            const credentials = omit(user, 'password');
            credentials.scope = ['user', `user-${credentials.id}`];
            callback(null, !isEmpty(user), credentials);
        })
        .catch(err => callback(err, false));
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
        validateFunc: validateJWTCredentials,
        errorFunc: errorFunc,
        verifyOptions: { algorithms: [ 'HS256' ] },
    };
}

exports.register = function (server, options, next) {
    const config = Hoek.merge(generateDefaultOptions(), options);
    server.auth.strategy('jwt', 'jwt', config);
    server.auth.default('jwt');
    next();
};

exports.register.attributes = {
    name: 'Auth',
};

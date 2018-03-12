'use strict';

const Hoek = require('hoek');
const isNil = require('lodash/isNil');
const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const JWT = require('jsonwebtoken');
const Cookie = require('cookie');
const User = require('../../schemata/user');

function tokenFromRequest (request) {
    const cookies = Cookie.parse(get(request, 'headers.cookie', ''));
    return get(cookies, 'token');
}

function validateFunc (decoded, request, callback) {
    User.findById(decoded.id)
        .lean()
        .then(user => callback(null, !isNil(user)))
        .catch(err => callback(err, false));
}

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
        validateFunc: validateFunc,
        errorFunc: errorFunc,
        verifyOptions: { algorithms: [ 'HS256' ] },
    };
}

exports.register = function (server, options, next) {
    const config = Hoek.merge(generateDefaultOptions(), options);
    server.auth.strategy('jwt', 'jwt', config);
    server.auth.default('jwt');

    server.ext('onPreHandler', async (request, reply) => {
        const token = request.auth.token || tokenFromRequest(request);
        if (!isEmpty(token)) {
            try {
                const { id } = JWT.decode(request.auth.token || token);
                const user = await User.findById(id).lean();
                request.auth.user = user;
            } catch (err) {
                console.error('Error fetching user via jwt token');
            }
        }
        return reply.continue();
    });

    next();
};

exports.register.attributes = {
    name: 'Auth',
};

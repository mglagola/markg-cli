'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

const JWT_COOKIE_EXPIRATION = '360d';

const Path = require('path');
const connection = require('./connection-options.js')[NODE_ENV];

module.exports = {
    NODE_ENV,
    JWT_SECRET,
    JWT_COOKIE_EXPIRATION,
    connection,
    cookieOptions: {
        ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
        encoding: 'none', // we already used JWT to encode
        isSecure: false,
        isHttpOnly: true,
        clearInvalid: false,
        strictHeader: true,
        path: '/',
    },
    serverOptions: {
        debug: { request: ['error'] },
        connections: {
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, '../public'),
                },
            },
        },
    },
    mongooseOptions: {
        uri: MONGO_URI,
    },
};

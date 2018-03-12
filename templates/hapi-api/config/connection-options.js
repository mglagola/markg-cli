'use strict';

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: {
            cors: { credentials: true },
            auth: 'jwt',
        },
    },
    production: {
        port: process.env.PORT || 3000,
        routes: {
            auth: 'jwt',
        },
    },
    test: {
        port: process.env.PORT || 3000,
        routes: {
            auth: 'jwt',
        },
    },
};

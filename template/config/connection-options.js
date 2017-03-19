'use strict';

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        host: 'localhost',
        routes: {
            cors: true,
            auth: 'jwt',
        },
    },
    production: {
        port: process.env.PORT || 3000,
        routes: {
            auth: 'jwt',
        },
    },
};

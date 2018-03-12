'use strict';

const User = require('./user');

const defaults = {
    enableAuth: true,
};

module.exports.register = function register (server, options, next) {
    options = Object.assign({}, defaults, options);

    server.route([
        { path: '/', method: 'GET', config: { auth: false }, handler: (req, reply) => reply({ success: true }) },

        { method: 'POST', path: '/api/v2/login', config: User.login },
        { method: 'POST', path: '/api/v2/register', config: User.create },
    ]);

    next();
};

module.exports.register.attributes = {
    name: 'Water',
    version: '1.0.0',
};

const wrapRouteWithTryCatch = require('../utils/wrap-route-try-catch');

const User = require('./user');

const defaults = {
    enableAuth: false,
};

function register (server, options, next) {
    options = Object.assign({}, defaults, options);

    const routes = [
        { method: 'GET', path: '/', config: { auth: false, handler: (req, reply) => ({ success: true }) } },

        { method: 'POST', path: '/api/v1/auth', config: User.auth },
    ];

    server.route(
        routes.map(wrapRouteWithTryCatch)
    );
};

module.exports = register;
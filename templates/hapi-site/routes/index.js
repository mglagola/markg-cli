'use strict';

const Home = require('./home');
const Public = require('./public');
const Register = require('./register');
const Auth = require('./auth');

const defaults = {
    enableAuth: true,
};

module.exports.register = function register (server, options, next) {
    options = Object.assign({}, defaults, options);

    server.route([
        { method: 'GET', path: '/css/{file*}', config: Public.retrieveCSS },
        { method: 'GET', path: '/js/{file*}', config: Public.retrieveJS },

        { method: 'GET', path: '/', config: Home.retrieve },

        { method: 'GET', path: '/register', config: Register.retrieve },
        { method: 'POST', path: '/register', config: Register.create },
        { method: 'GET', path: '/login', config: Auth.retrieve },
        { method: 'POST', path: '/login', config: Auth.create },
        { method: 'GET', path: '/logout', config: Auth.remove },
    ]);

    next();
};

module.exports.register.attributes = {
    name: 'Water',
    version: '1.0.0',
};

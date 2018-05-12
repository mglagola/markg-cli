const Boom = require('boom');
const Config = require('../config');
const reportError = require('./report-error');

const DEFAULT_STATUS_CODE = Config.NODE_ENV === 'development'
    ? 400
    : 500;

function wrapRouteWithTryCatch (route) {
    try {
        let { config } = route;
        const { handler } = config;

        const newHandler = async (...args) => {
            try {
                return await handler(...args);
            } catch (error) {
                const statusCode = error.statusCode || DEFAULT_STATUS_CODE;
                if (statusCode >= 500) {
                    reportError(error);
                }
                const response = Boom.boomify(error, { statusCode });
                return response;
            }
        };

        config.handler = newHandler;

        return Object.assign({}, route, { config });
    } catch (error) {
        return route;
    }
}

module.exports = wrapRouteWithTryCatch;
/* eslint no-process-exit: 0 */

Error.from = function (message, statusCode = 500) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

global.Promise = require('bluebird');

const FS = require('fs');
const Path = require('path');
const Dotenv = require('dotenv');
const envPath = Path.resolve(__dirname, '.env');
if (FS.existsSync(envPath)) {
    console.log('Loading .env');
    Dotenv.config({ path: envPath });
}

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiAuthJwt = require('hapi-auth-jwt2');
const HapiGoodWinston = require('hapi-good-winston').default;
const HapiGood = require('good');
const Winston = require('winston');
const Config = require('./config');
const Routes = require('./routes');
const HapiMongoose = require('hapi-mongoose-connection');
const Auth = require('./middleware/auth');
const Pkg = require('./package.json');

if (!Config.JWT_SECRET) {
    console.error('JWT_SECRET is not set!');
    process.exit(1);
}

const GoodSetup = {
    plugin: HapiGood,
    options: {
        reporters: {
            winston: [HapiGoodWinston(Winston)],
        },
    },
};

const MongooseSetup = {
    plugin: HapiMongoose,
    options: Config.mongooseOptions,
};

const AuthSetup = {
    plugin: Auth,
    options: {
        key: Config.JWT_SECRET,
    },
};

const RouteSetup = {
    name: 'Api',
    version: Pkg.version,
    register: Routes,
};

(async () => {
    try {
        const server = new Hapi.Server(Config.serverOptions);

        const plugins = [
            GoodSetup,
            Vision,
            Inert,
            MongooseSetup,
            HapiAuthJwt,
            AuthSetup,
            RouteSetup,
        ];
        await Promise.each(plugins, plugin => server.register(plugin));

        await server.start();

        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('Server running at:', server.info.uri);

    } catch (error) {
        console.error(error);
    }
})();

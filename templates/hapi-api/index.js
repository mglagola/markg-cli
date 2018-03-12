/* eslint no-process-exit: 0 */

'use strict';

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

if (!Config.JWT_SECRET) {
    console.error('JWT_SECRET is not set!');
    process.exit(1);
}

const server = new Hapi.Server(Config.serverOptions);

const GoodSetup = {
    register: HapiGood,
    options: {
        reporters: {
            winston: [HapiGoodWinston(Winston)],
        },
    },
};

const MongooseSetup = {
    register: HapiMongoose,
    options: Config.mongooseOptions,
};

const AuthSetup = {
    register: Auth,
    options: {
        key: Config.JWT_SECRET,
    },
};

const RouteSetup = {
    register: Routes,
};

server.connection(Config.connection);

server.register([
    GoodSetup,
    Vision,
    Inert,
    MongooseSetup,
    HapiAuthJwt,
    AuthSetup,
    RouteSetup,
], (err) => {
    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            console.error(`Server failed to start - ${err.message}`);
            process.exit(1);
        }

        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('Server running at:', server.info.uri);
    });
});

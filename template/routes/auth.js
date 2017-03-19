'use strict';

const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const User = require('../schemata/user');
const Config = require('../config');
const generateToken = require('../utilities/gen-token');

exports.retrieve = {
    description: 'Retrieves home page',
    tags: ['home'],
    auth: false,
    handler (request, reply) {
        return reply.view('login');
    },
};

exports.create = {
    description: 'Creates a new user',
    tags: ['api'],
    auth: false,
    validate: {
        payload: {
            email: Joi.string().email().required().description('Email address'),
            password: Joi.string().min(4).required().description('Password'),
        },
    },
    async handler ({ payload }, reply) {
        const { email, password } = payload;
        try {
            const user = await User.findOne({ email });
            if (isEmpty(user)) {
                return reply.view('login', { errors: { message: 'Invalid email or password!' }, input: { email } });
            }

            const isValid = await user.comparePassword(password);
            if (!isValid) {
                return reply.view('login', { errors: { message: 'Invalid email or password!' }, input: { email } });
            }

            const token = generateToken(user._id.toString());
            return reply('home')
                .redirect('/')
                .header("Authorization", Config.cookieOptions)
                .state("token", token, Config.cookieOptions);
        } catch (err) {
            return reply(err);
        }
    },
};

exports.remove = {
    description: 'Logout user',
    tags: ['api'],
    auth: false,
    handler (request, reply) {
        return reply()
            .redirect('/')
            .unstate('token', Config.cookieOptions);
    },
};

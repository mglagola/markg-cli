'use strict';

const Joi = require('joi');
const User = require('../schemata/user');
const isEmpty = require('lodash/isEmpty');
const Config = require('../config');
const generateToken = require('../utilities/gen-token');

exports.retrieve = {
    description: 'Retrieves home page',
    tags: ['home'],
    auth: false,
    handler (request, reply) {
        return reply.view('register');
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
            firstName: Joi.string().min(1).required().description('First Name'),
            lastName: Joi.string().min(1).required().description('Last Name'),
        },
    },
    async handler ({ payload }, reply) {
        const { email } = payload;
        try {
            const userForEmail = await User.findOne({ email: email.toLowerCase() }).lean();
            if (!isEmpty(userForEmail)) {
                const message = `User with email <strong>${email}</strong> already exists!`;
                return reply.view('register', { errors: { message } });
            }

            const user = await new User(payload).save();
            const token = generateToken(user._id.toString());
            return reply()
                .redirect('/')
                .header("Authorization", Config.cookieOptions)
                .state("token", token, Config.cookieOptions);
        } catch (err) {
            return reply(err);
        }
    },
};

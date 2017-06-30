'use strict';

const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const User = require('../schemata/user');
const generateToken = require('../utils/gen-token');

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
                throw new Error(`User with email ${email} already exists!`)
            }

            const user = await new User(payload).save();
            const token = generateToken(user._id.toString());
            return reply({
                token,
                user: user.toJSON(),
            });
        } catch (err) {
            return reply(err);
        }
    },
};

exports.login = {
    description: 'Login a user',
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
                throw new Error('Invalid email or password!');
            }

            const isValid = await user.comparePassword(password);
            if (!isValid) {
                throw new Error('Invalid email or password!');
            }

            const token = generateToken(user._id.toString());
            return reply({
                token,
                user: user.toJSON(),
            })
        } catch (err) {
            return reply(err);
        }
    },
};

const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const User = require('../schemata/user');
const generateToken = require('../utils/gen-token');

async function findUserOrCreate (payload = {}) {
    const { email } = payload
    const user = await User.findOne({ email });
    if (isEmpty(user)) {
        const user = await new User(payload).save();
        return { user, didCreate: true };
    }
    return { user, didCreate: false };
}

exports.auth = {
    description: `Authenticates user (will create user if doesn't exist)`,
    tags: ['api'],
    auth: false,
    validate: {
        payload: {
            email: Joi.string().email().required().description('Email address'),
            password: Joi.string().min(4).required().description('Password'),
        },
    },
    async handler ({ payload }) {
        const { password } = payload;
        const { user, didCreate } = await findUserOrCreate(payload);
        if (!didCreate) {
            const isValid = await user.comparePassword(password);
            if (!isValid) {
                return Error.from('Invalid password!', 404);
            }
        }
        const token = generateToken(user._id.toString());
        return {
            token,
            user: user.toJSON(),
            isNewUser: didCreate,
        };
    },
}

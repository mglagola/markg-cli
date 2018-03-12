'use strict';

exports.retrieve = {
    description: 'Retrieves home page',
    tags: ['home'],
    auth: false,
    handler ({ auth }, reply) {
        const user = auth.user;
        return reply.view('home', { message: 'Hello mark', user });
    },
};

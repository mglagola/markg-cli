'use strict';

exports.retrieveCSS = {
    description: 'Retrieves css assets',
    tags: ['public', 'assets', 'css'],
    auth: false,
    handler: {
        directory: {
            path: 'css',
        },
    },
};

exports.retrieveJS = {
    description: 'Retrieves css assets',
    tags: ['public', 'assets', 'js'],
    auth: false,
    handler: {
        directory: {
            path: 'js',
        },
    },
};

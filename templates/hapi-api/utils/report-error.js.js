'use strict';

const Config = require('../config');

function report (error) {
    if (Config.NODE_ENV === 'production') {
        // TODO:(mark) error reporting 
        console.error(error);
    } else {
        console.error(error);
    }
}

module.exports = report;

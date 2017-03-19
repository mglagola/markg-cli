#! /usr/bin/env node

'use strict';

const Promise = require('bluebird');
global.Promise = Promise;

const Inquirer = require('inquirer');
const Path = require('path');
const program = require('commander');
const isEmpty = require('lodash/isEmpty');
const create = require('./lib');

const requireValue = (name) => (value) => {
    return isEmpty(value) ? `You must provide a valid ${name}!` : true;
};

function questions (name) {
    return [{
        type: 'input',
        name: 'name',
        message: 'What is the name of your site?',
        default: name,
        validate: requireValue('site name'),
    }, {
        type: 'input',
        name: 'description',
        message: 'Site\'s description?',
        default: '',
    }, {
        type: 'input',
        name: 'version',
        message: 'Site\'s version?',
        default: '1.0.0',
    }, {
        type: 'input',
        name: 'author',
        message: 'Site author?',
    }, {
        type: 'input',
        name: 'nodeVersion',
        message: 'What node version are you using?',
        default: '7.7',
    }, {
        type: 'input',
        name: 'mongoURI',
        message: 'What is your dev mongo URI?',
        validate: requireValue('mongo URI'),
    }];
}

program.version('1.0');

program
    .command('new <name>')
    .action((name) => {
        if (!name) {
            console.error('No options supplied, see help');
            return;
        }

        const outputDir = Path.join(process.cwd(), name);
        Inquirer.prompt(questions(name))
            .then(data => {
                return create({ outputDir, data });
            })
            .then(() => {
                console.log('✅  Generated ✅');
                process.exit(0);
            })
            .catch(error => {
                console.error(error);
                console.error(`❌  FAILED to generate ❌`);
                process.exit(1);
            });
    });

program.parse(process.argv);

#! /usr/bin/env node

'use strict';

const Promise = require('bluebird');
global.Promise = Promise;

const Inquirer = require('inquirer');
const Path = require('path');
const isEmpty = require('lodash/isEmpty');
const create = require('./lib');
const chalk = require('chalk');
const meow = require('meow');

const cli = meow(`
  Usage:
    $ hapi <api|site> <output-dir>

  Examples:
    $ hapi api my-awesome-api
    $ hapi site my-awesome-site
`);

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
        default: '7.8',
    }, {
        type: 'input',
        name: 'mongoURI',
        message: 'What is your dev mongo URI?',
        validate: requireValue('mongo URI'),
    }];
}

async function main (command, name) {
    try {
        switch (command) {
        case 'api':
        case 'site': {
            const outputDir = Path.join(process.cwd(), name);
            const data = await Inquirer.prompt(questions(name));
            await create({ outputDir, data, template: command });
            console.log(chalk.green('Generated!'));
            process.exit(0);
        }
        default:
            console.log(chalk.red(`Unknown command ${command}.`), 'See --help for usage details');
            process.exit(1);
        }
    } catch (error) {
        console.log(chalk.bgRed(' Error '));
        console.error(error);
        process.exit(1);
    }
}

const command = cli.input[0];
if (isEmpty(command)) {
    console.log(chalk.red('Please specify a command'), 'See --help for usage details');
    process.exit(1);
}

const outputDir = cli.input[1];
if (isEmpty(outputDir)) {
    console.log(chalk.red('Please specify a output dir'), 'See --help for usage details');
    process.exit(1);
}

main(command, outputDir);

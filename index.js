#! /usr/bin/env node

'use strict';

const Promise = require('bluebird');
global.Promise = Promise;

const Inquirer = require('inquirer');
const Path = require('path');
const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const create = require('./lib');
const chalk = require('chalk');
const meow = require('meow');

const cli = meow(`
  Usage: hapi [cmd] <output-dir>

  Commands:
    site        Generates a hapi starter site
    api         Generates a hapi starter api
    cli         Generates a cli starter project

  Examples:
    $ hapi api my-awesome-api
    $ hapi site my-awesome-site
`);

const requireValue = (name) => (value) => {
    return isEmpty(value) ? `You must provide a valid ${name}!` : true;
};

function questions (cmd, name) {
    const qs = [{
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        default: name,
        validate: requireValue('project name'),
    }, {
        type: 'input',
        name: 'description',
        message: 'Project description?',
        default: '',
    }, {
        type: 'input',
        name: 'version',
        message: 'Project version?',
        default: '1.0.0',
    }, {
        type: 'input',
        name: 'author',
        message: 'Project author?',
    }, {
        type: 'input',
        name: 'nodeVersion',
        message: 'What node version are you using?',
        default: get(process, 'versions.node', '7.8'),
    }, {
        type: 'input',
        name: 'mongoURI',
        message: 'What is your dev mongo URI?',
        validate: requireValue('mongo URI'),
    }];

    return cmd === 'cli'
        ? qs.slice(0, qs.length - 1)
        : qs;
}

async function main (cmd, input, flags) {
    const name = input[0];
    const outputDir = Path.join(process.cwd(), name);
    const qs = questions(cmd, name);
    switch (cmd) {
    case 'cli':
    case 'api':
    case 'site': {
        const data = await Inquirer.prompt(qs);
        await create({ outputDir, data, template: cmd });
        break;
    }
    default:
        console.log(chalk.red(`Unknown command ${cmd}.`), 'See --help for usage details');
        return false;
    }
    console.log(chalk.green('Generated!'));
    return true;
}

(async function () {
    try {
        console.log('Flags:', cli.flags);
        const cmd = cli.input[0];
        const input = cli.input.slice(1, cli.input.length);

        if (isEmpty(cmd)) {
            console.log(chalk.red('Please specify a command'), 'See --help for usage details');
            process.exit(1);
        }

        const outputDir = input[0];
        if (isEmpty(outputDir)) {
            console.log(chalk.red('Please specify a output dir'), 'See --help for usage details');
            process.exit(1);
        }

        const success = await main(cmd, input, cli.flags);
        return process.exit(success ? 0 : 1);
    } catch (error) {
        console.log(chalk.red(error.message));
        console.error(error.stack);
        return process.exit(1);
    }
})();

#! /usr/bin/env node

const Promise = require('bluebird');
global.Promise = Promise;

const pkg = require('./package.json');
const inquirer = require('inquirer');
const program = require('commander');
const path = require('path');
const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const create = require('./lib');
const chalk = require('chalk');
const { logVersionCheck } = require('validate-package-version');

const requireValue = (name) => (value) => {
    return isEmpty(value) ? `You must provide a valid ${name}!` : true;
};

function questions (name, { requiresMongoURL = false } = {}) {
    let qs = [{
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
        default: get(process, 'versions.node', '9.0.0'),
    }, {
        type: 'input',
        name: 'mongoURI',
        message: 'What is your dev mongo URI?',
        validate: requireValue('mongo URI'),
    }];

    if (!requiresMongoURL) {
        qs = qs.slice(0, qs.length - 1);
    }

    return qs;
}

const tryCatchCmd = (func) => async (...args) => {
    try {
        const success = await func(...args);
        if (success) {
            console.log(chalk.green('Generated!'));
        } else {
            console.log(chalk.red('Something went wrong generating template.'));
        }
        return process.exit(success ? 0 : 1);
    } catch (error) {
        console.log(chalk.red(error.message));
        console.error(error.stack);
        return process.exit(1);
    }
};

const act = (func, ignoreVersionCheck = false) => async (...args) => {
    if (!ignoreVersionCheck) {
        await logVersionCheck(pkg);
    }
    return tryCatchCmd(func)(...args);
};

const outputDirFromName = (name) => path.join(process.cwd(), name);

program
    .command('hapi:site <name>')
    .description('Generates a hapi site starter project')
    .action(act(async (name) => {
        const outputDir = outputDirFromName(name);
        const data = await inquirer.prompt(
            questions(name, { requiresMongoURL: true })
        );
        await create({ outputDir, data, template: 'hapi-site' });
        return true;
    }));

program
    .command('hapi:api <name>')
    .description('Generates a hapi api starter project')
    .action(act(async (name) => {
        const outputDir = outputDirFromName(name);
        const data = await inquirer.prompt(
            questions(name, { requiresMongoURL: true })
        );
        await create({ outputDir, data, template: 'hapi-api' });
        return true;
    }));

program
    .command('express <name>')
    .description('Generates a simple express starter project')
    .action(act(async (name) => {
        const outputDir = outputDirFromName(name);
        const data = await inquirer.prompt(
            questions(name)
        );
        await create({ outputDir, data, template: 'express' });
        return true;
    }));

program
    .command('nextjs <name>')
    .description('Generates a simple nextjs starter project')
    .action(act(async (name) => {
        const outputDir = outputDirFromName(name);
        const data = await inquirer.prompt(
            questions(name)
        );
        await create({ outputDir, data, template: 'nextjs', skipCompileForFileExtensions: ['js', 'css'] });
        return true;
    }));

program
    .command('cli:meow <name>')
    .description('Generates a meow cli starter project')
    .action(act(async (name) => {
        const outputDir = outputDirFromName(name);
        const data = await inquirer.prompt(
            questions(name)
        );
        await create({ outputDir, data, template: 'cli-meow' });
        return true;
    }));

program
    .command('cli:commander <name>')
    .description('Generates a commander cli starter project')
    .action(act(async (name) => {
        const outputDir = outputDirFromName(name);
        const data = await inquirer.prompt(
            questions(name)
        );
        await create({ outputDir, data, template: 'cli-commander' });
        return true;
    }));

program
    .command('lib <name>')
    .description('Generates a simple npm lib starter project')
    .action(act(async (name) => {
        const outputDir = outputDirFromName(name);
        const data = await inquirer.prompt(
            questions(name)
        );
        await create({ outputDir, data, template: 'lib' });
        return true;
    }));

program
    .version(pkg.version)
    .description(pkg.description)
    .parse(process.argv);

if (isEmpty(program.args)) {
    console.log(chalk.red('Please specify a command. Use --help to learn more.'));
    process.exit(1);
}

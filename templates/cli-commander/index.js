#! /usr/bin/env node

const pkg = require('./package.json');
const program = require('commander');
const path = require('path');
const chalk = require('chalk');
const { logVersionCheck } = require('validate-package-version');

const tryCatchCmd = (func) => async (...args) => {
    try {
        const success = await func(...args);
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

program
    .command('temp <name>')
    .description('Temp command')
    .action(act(async (name) => {
        console.log(`This is a temp command ${name}!`);
        return true;
    }));

program
    .version(pkg.version)
    .description(pkg.description)
    .parse(process.argv);

if (program.args.length === 0) {
    console.log(chalk.red('Please specify a command. Use --help to learn more.'));
    process.exit(1);
}

#! /usr/bin/env node

const meow = require('meow');
const chalk = require('chalk');

const cli = meow(`
Usage: {{name}} [flags]

Options:
  --verbose, -v     Verbose logging flag

Examples:
  $ {{name}}
  $ {{name}} -v
`, {
    flags: {
        verbose: {
            alias: 'v',
            type: 'boolean',
        },
    },
});

async function main (input, flags) {
    // TODO: start here!
    throw new Error('Unimplemented main function!');
    
    return true;
}

(async function () {
    try {
        console.log('Flags:', cli.flags);
        const success = await main(cli.input, cli.flags);
        return process.exit(success ? 0 : 1);
    } catch (error) {
        console.log(chalk.red(error.message));
        console.error(error.stack);
        return process.exit(1);
    }
})();

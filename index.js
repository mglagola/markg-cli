#! /usr/bin/env node

const Promise = require('bluebird');
global.Promise = Promise;

const pkg = require('./package.json');
const inquirer = require('inquirer');
const program = require('commander');
const path = require('path');
const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const F = require('lodash/fp');
const create = require('./lib');
const chalk = require('chalk');
const slugify = require('slugify');
const { logVersionCheck } = require('validate-package-version');

const requireValue = (name) => (value) => {
    return isEmpty(value) ? `You must provide a valid ${name}!` : true;
};

function questions (name, {
    askAuthor = true,
    askNodeVersion = true,
    requiresMongoURL = false,
    askExpoInfo = false,
} = {}) {
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
    }];

    if (askAuthor) {
        qs.push({
            type: 'input',
            name: 'author',
            message: 'Project author?',
            default: 'Unknown',
        });
    }

    if (askNodeVersion) {
        qs.push({
            type: 'input',
            name: 'nodeVersion',
            message: 'What node version are you using?',
            default: get(process, 'versions.node', '9.0.0'),
        });
    }

    if (requiresMongoURL) {
        qs.push({
            type: 'input',
            name: 'mongoURI',
            message: 'What is your dev mongo URI?',
            validate: requireValue('mongo URI'),
        });
    }

    if (askExpoInfo) {
        [{
            type: 'input',
            name: 'expoSDKVersion',
            message: 'What expo sdk version would you like to use?',
            default: '25.0.0',
        }, {
            type: 'input',
            name: 'reactVersion',
            message: 'What react version would you like to use?',
            default: '16.2.0',
        }, {
            type: 'input',
            name: 'bundleId',
            message: "What is your bundle-identifier/package-name?",
            default: `com.temp.bundleId`,
        }].forEach(v => qs.push(v));
    }

    return qs;
}

const _questionToTypeReducer = (a, q) => {
    a[q.name] = q.default;
    return a;   
};

async function prompt (questions, { skipDefaultQuestions = false } = {}) {
    if (skipDefaultQuestions) {
        const questionsWithoutDefaults = questions.filter(x => F.isNil(x.default));
        if (isEmpty(questionsWithoutDefaults)) {
            return questions.reduce(_questionToTypeReducer, {});
        } else {
            const res = await inquirer.prompt(questionsWithoutDefaults);
            const defaultAnswers = questions
                .filter(x => !F.isNil(x.default))
                .reduce(_questionToTypeReducer, {});
            return Object.assign({}, res, defaultAnswers);
        }
    }
    return inquirer.prompt(questions);
}

function logSuccessOutput ({ outputDir }) {
    console.log(chalk.green('Generated!'));
    console.log('');
    console.log(`$ cd ${outputDir}; npm install`);
    console.log('');    
}

const tryCatchCmd = (func) => async (...args) => {
    try {
        const success = await func(...args);
        if (!success) {
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

const outputDirFromName = (name) => path.join(process.cwd(), slugify(name));

program
    .command('hapi:site [name]')
    .description('Generates a hapi site starter project')
    .option('-y, --skip-default-questions')
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name, { requiresMongoURL: true }),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'hapi-site' });
        logSuccessOutput({ outputDir });
        return true;
    }));

program
    .command('hapi:api [name]')
    .description('Generates a hapi api starter project')
    .option('-y, --skip-default-questions')    
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name, { requiresMongoURL: true }),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'hapi-api' });
        logSuccessOutput({ outputDir });        
        return true;
    }));

program
    .command('express [name]')
    .description('Generates a simple express starter project')
    .option('-y, --skip-default-questions')    
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'express' });
        logSuccessOutput({ outputDir });        
        return true;
    }));

program
    .command('nextjs [name]')
    .description('Generates a simple nextjs starter project')
    .option('-y, --skip-default-questions')    
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'nextjs', skipCompileForFileExtensions: ['js', 'css'] });
        logSuccessOutput({ outputDir });        
        return true;
    }));

program
    .command('expo:bare [name]')
    .description('Generates a bare expo (react-native) starter project')
    .option('-y, --skip-default-questions')    
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name, { askExpoInfo: true }),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'expo-bare', skipCompileForFileExtensions: ['js', 'png'] });
        logSuccessOutput({ outputDir });        
        return true;
    }));

program
    .command('expo:redux [name]')
    .description('Generates a redux and react-navigation boilerplate expo (react-native) project')
    .option('-y, --skip-default-questions')    
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name, { askExpoInfo: true }),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'expo-redux', skipCompileForFileExtensions: ['js', 'png'] });
        logSuccessOutput({ outputDir });        
        return true;
    }));

program
    .command('cli:meow [name]')
    .description('Generates a meow cli starter project')
    .option('-y, --skip-default-questions')    
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'cli-meow' });
        logSuccessOutput({ outputDir });        
        return true;
    }));

program
    .command('cli:commander [name]')
    .description('Generates a commander cli starter project')
    .option('-y, --skip-default-questions')    
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'cli-commander' });
        logSuccessOutput({ outputDir });        
        return true;
    }));

program
    .command('lib [name]')
    .description('Generates a simple npm lib starter project')
    .option('-y, --skip-default-questions')    
    .action(act(async (name, options) => {
        const data = await prompt(
            questions(name),
            options
        );
        const outputDir = outputDirFromName(data.name);
        await create({ outputDir, data, template: 'lib' });
        logSuccessOutput({ outputDir });        
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

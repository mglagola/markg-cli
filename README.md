# Markg

A very opinionated generator cli using [easy-generator](https://github.com/mglagola/easy-generator).

## Installation

```bash
npm install -g markg
```

## Usage

```
$ markg --help

  Usage: markg [options] [command]

  Opinionated template generator

  Options:

    -V, --version                   output the version number
    -h, --help                      output usage information

  Commands:

    hapi:site [options] [name]      Generates a hapi site starter project
    hapi:api [options] [name]       Generates a hapi api starter project
    express [options] [name]        Generates a simple express starter project
    nextjs:bare [options]           Generates a simple nextjs starter project
    nextjs:native [options]         Generates a simple nextjs react-native(web) starter project
    expo:bare [options] [name]      Generates a bare expo (react-native) starter project
    expo:redux [options] [name]     Generates a redux and react-navigation boilerplate expo (react-native) project
    cli:meow [options] [name]       Generates a meow cli starter project
    cli:commander [options] [name]  Generates a commander cli starter project
    lib [options] [name]            Generates a simple npm lib starter project
```

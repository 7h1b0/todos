# Todos &middot; [![Build Status](https://travis-ci.org/7h1b0/todos.svg?branch=master)](https://travis-ci.org/7h1b0/todos) ![Firefox Support](https://img.shields.io/badge/firefox-%3E%3D%2060-orange.svg) ![Chrome Support](https://img.shields.io/badge/chrome-%3E%3D%2070-yellow.svg)

Todo application built with Preact and IndexedDB

## Table of Contents

- [Browsers support](#browsers-support)
- [Prerequisite](#prerequisite)
- [Install procedure](#install-procedure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
  - [npm run deploy](#npm-run-deploy)
  - [npm test](#npm-test)
  - [npm run test:e2e](#npm-run-teste2e)

## Browsers support

- Firefox >= 60
- Chrome >= 70

:warning: Edge is not supported as it doesn't support `getAll` on `objectStore`.

## Prerequisite

- NodeJS >= 8
- NPM >= 5

## Installation

1. Execute `npm i`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm run build`

Builds the application for production.

### `npm run deploy`

Deploy dist folder to gh-pages branch on GitHub

### `npm test`

Runs the test watcher in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `npm run test:e2e`

Runs end-to-end tests using Puppeteer.

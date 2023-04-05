#!/usr/bin/env node

const shell = require('shelljs');

const fs = require('fs');
const path = require('path');

const colorError = '\x1b[31m';
const printError = (message) => console.error(colorError, message);

const dir = process.argv[2];

shell.echo('Generating express app');

if (!dir)
  return printError(
    'please enter project name, run: npx express-generator-cli [project-name]'
  );

if (fs.existsSync(dir))
  return printError('directory exists, please choose another name');

fs.mkdirSync(dir);
fs.mkdirSync(`${dir}/routes`);
fs.mkdirSync(`${dir}/controller`);
fs.mkdirSync(`${dir}/models`);
fs.mkdirSync(`${dir}/middlewares`);

fs.copyFile(
  path.join(__dirname, 'template/app.js'),
  `${dir}/app.js`,
  (error) => {
    if (error) printError('error copying app.js: ' + error);
  }
);
fs.copyFile(
  path.join(__dirname, 'template/.gitignore'),
  `${dir}/.gitignore`,
  (error) => {
    if (error) printError('error copying .gitignore: ' + error);
  }
);
fs.copyFile(
  path.join(__dirname, 'template/index.js'),
  `${dir}/index.js`,
  (error) => {
    if (error) printError('error copying index.js: ' + error);
  }
);

shell.cd(`${dir}`);

shell.exec(`touch db.js`);
shell.exec(`touch .env`);
shell.echo('Generating package.json');
shell.exec(`npm init -y`);

shell.echo('Installing express dotenv');
shell.exec(` npm i express `);
shell.exec(` npm i -D dotenv`);

shell.echo('Initializing git');
shell.exec(`git init`);

shell.echo(`cd ${dir} and happy coding`);

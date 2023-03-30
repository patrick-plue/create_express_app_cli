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

fs.copyFile(
  path.join(__dirname, 'template/app.js'),
  `${dir}/app.js`,
  (error) => {
    if (error) printError('error copying app.js: ' + error);
  }
);
fs.copyFile(path.join(__dirname, 'template/.env'), `${dir}/.env`, (error) => {
  if (error) printError('error copying .env: ' + error);
});
fs.copyFile(
  path.join(__dirname, 'template/.gitignore'),
  `${dir}/.gitignore`,
  (error) => {
    if (error) printError('error copying .gitignore: ' + error);
  }
);
// fs.copyFile(
//   path.join(__dirname, 'template/package.json'),
//   `${dir}/package.json`,
//   (error) => {
//     if (error) printError('error copying package.json: ' + error);
//   }
// );
fs.copyFile(path.join(__dirname, 'template/db.js'), `${dir}/db.js`, (error) => {
  if (error) printError('error copying db.js: ' + error);
});
fs.copyFile(
  path.join(__dirname, 'template/index.js'),
  `${dir}/index.js`,
  (error) => {
    if (error) printError('error copying index.js: ' + error);
  }
);

shell.echo('Generating package.json');
shell.exec(`cd ${dir}; npm init -y`);

shell.echo('Installing nodemon express dotenv');
shell.exec(`cd ${dir}; npm i nodemon express dotenv`);

shell.echo('Initializing git');
shell.exec(`cd ${dir}; git init`);

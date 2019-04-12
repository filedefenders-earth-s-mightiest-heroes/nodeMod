#!/usr/bin/env node
'use strict';

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require("fs");
const resolve = require('path').resolve;

const init = () => {
  console.log(
      chalk.red(
          figlet.textSync('Check Me Out', {
            font: "poison",
            horizontalLayout: "default",
            verticalLayout: "default"
          })
      )
  );
};

const askForFile = () => {
  const q = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the path for the file that you would like to check?"
    }
  ];
  return inquirer.prompt(q);
};

const createBuffer = (file) => {
  fs.readFile(file, (err, data) => {
    if (err) throw error;
    console.log(data);
    return data;
  });
};

const run = async () => {
  //show script intro
  init();
  //ask user for a filepath
  let file = "badFilePath";
  //check to see if a file exists at the filepath
  file = await askForFile();
  // Andrew - ensure file exists and is a file rather than directory, symlink, etc...
  while (!fs.existsSync(`${file.FILENAME}` && !fs.statSync(file.FILENAME).isFile())) {
    console.log('the filepath you entered was invalid, ensure it is a file not a directory);
    file = await askForFile();
  }
  // Andrew - resolve relative paths to absolute
  file.FILENAME = resolve(file.FILENAME);
  console.log(file.FILENAME);

  //create a buffer for the file
  // const buffer = createBuffer(`${file.FILENAME}`);

  //attach the buffer to the body of the request
};
run();

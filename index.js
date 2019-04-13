#!/usr/bin/env node
'use strict';

require('dotenv').config();

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require("fs");
const resolve = require('path').resolve;
const superagent = require('superagent');
const http = require('https');

//node modules
//const user= require("user.js");

//state of the running application
//const state{}

const init = () => {
  console.log(
    chalk.red(
    figlet.textSync('Check Me Out', {
      font: "Poison",
      horizontalLayout: "default",
      verticalLayout: "default"
    })));
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

const uploadFile = (filepath) => {
  superagent.post('https://api.metadefender.com/v4/file')
    .set('apikey', `${process.env.API_KEY}`)
    .set('Content-Type', 'application/octet-stream')
    // .send("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"\"; filename=\"C:\\Users\\JeromeJoof\\Desktop\\kayjay.jpg\"\r\nContent-Type: application/pdf\r\n\r\n\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--")
    .send(filepath)

    .then(res => {
      //console.log(res);
      console.log('------------------------------------------------------------------------');
      console.log(res.body.data_id);
      console.log('---------------------------------------------------------------------------');
      getReport(res.body.data_id);
    })
    .catch(console.log);
};

const getReport = (dataId) => {
  superagent.get(`https://api.metadefender.com/v4/file/${dataId}`)
    .set('apikey', `${process.env.API_KEY}`)
    .then(res => {
      console.log(res.body);
    })
    .catch(console.log);
};

const getChoice = () =>{
    const onCompromised = [
      {
        type: "list",
        name: "DECISION",
        message: "What would you like to do?",
        choices: ["ignore", "replace", "see report"],
        filter: function (val) {
          return val.split(".")[1];
        }
      }
    ];
  return (inquirer.prompt(onCompromised));
};

const endGame = async (file, safe)=>{
  if (safe){
    console.log(chalk.green(`✓ ${file.FILEPATH} is confirmed as a clean file`));
  }else {
    console.log(chalk.red(`⚠ ${file.FILEPATH} appears to be compromised.`));
      switch (await getChoice()) {
        case 'see report':
          console.log(chalk.blue('REPORT WOULD GO HERE'));
          break;
        case 'replace':
        //GET the scrubbed file from the api and replace our compromised file
          console.log(chalk.blue('RUN GET SCRUBBED FILE'));
          console.log(chalk.blue('REWRITE OVER COMPROMISED FILE'));
          break;
        case 'ignore':
          break;
      }
    }
};

const run = async () => {
  //show script intro
  init();
  //ask user for a filepath
  let file = "badFilePath";
  //check to see if a file exists at the filepath
  file = await askForFile();
  // Andrew - ensure file exists and is a file rather than directory, symlink, etc...
  while (!fs.existsSync(`${file.FILENAME}`) || !fs.statSync(file.FILENAME).isFile()) {
    // console.log(fs.statSync(file.FILENAME).isFile());
    console.log('the filepath you entered was invalid, ensure it is a file not a directory');
    file = await askForFile();
  }
  // Andrew - resolve relative paths to absolute
  file.FILENAME = resolve(file.FILENAME);
  console.log(file.FILENAME);
  //create a buffer for the file
  // Andrew - waiting until after MVP to do it use this
  // const buffer = createBuffer(`${file.FILENAME}`);
  //attach the buffer to the body of the request
  // Andrew - send filepath to Meta Defender API
  await uploadFile(file.FILENAME);
  endGame(file,false);
};

run();
#!/usr/bin/env node
'use strict';

const start = require('./start-cli');
const end = require('./end-cli');
const checkFile = require('./check-file');
const uploadFile = require('./upload-file');

const run = async () => {
  //show script intro
  start.init();
  //ask user for a filepath
  let fileName = await checkFile.check();

  // Using the file path to send the file to the api for analysis
  uploadFile.upload(fileName);
};

run();
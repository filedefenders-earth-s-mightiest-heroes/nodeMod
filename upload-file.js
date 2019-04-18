'use strict';

require('dotenv').config();

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const resolve = require('path').resolve;
const superagent = require('superagent');
const http = require('https');
const fs = require("fs");


module.exports.upload = (file) => {
    superagent.post = ('https://check-me-out-n12.herokuapp.com/')

}




'use strict';

require('dotenv').config();

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const resolve = require('path').resolve;
const superagent = require('superagent');
const http = require('https');
const fs = require("fs");


// This renders on the terminal once you run the checkmeout command
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

// This is the result of the report from the metadefender api

module.exports.end = (report)=>{
    console.log(report);
    if (report.status==='No Threat Detected'){
        console.log(chalk.green(`✓ ${report.filePath} is confirmed as a clean file`));
    }else {
        console.log(chalk.red(`⚠ ${report.filePath} appears to be compromised.`));
        switch (getChoice()) {
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
'use strict';

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require("fs");

const endGame = (safe) =>{
    if (safe){
        console.log(chalk.green(`✓ ${file.FILEPATH} is confirmed as a clean file`));
    }else{
        console.log(chalk.red(`⚠ ${file.FILEPATH} appears to be compromised.`));
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
        switch (inquirer.prompt(onCompromised)) {
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

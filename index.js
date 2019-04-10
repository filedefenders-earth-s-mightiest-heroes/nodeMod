#!/usr/bin/env node
'use strict';

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require("fs");

const init = () => {
    console.log(
        chalk.yellow(
            figlet.textSync('Check Me Out',{
                font:"Ghost",
                horizontalLayout:"default",
                verticalLayout:"default"
            })
        )
    );
};

const askForFile = () => {
    const q = [
        {
            name:"FILENAME",
            type:"input",
            message:"what is the path for the file that you would like to check?"
        }
    ];
    return inquirer.prompt(q);
};

const run = async () => {
    //show script intro
    init ();
    //ask user for a filepath
    let file = "badFilePath";
    //check to see if a file exists at the filepath
    file = await askForFile();

    while (!fs.existsSync(`${file.FILENAME}`)){
        console.log(file.FILENAME);
        console.log('the filepath you entered was invalid, please try again');
        file = await askForFile();
    };
};
run();
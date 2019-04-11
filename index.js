#!/usr/bin/env node
'use strict';

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require("fs");

const init = () => {
    console.log(
        chalk.red(
            figlet.textSync('Check Me Out',{
                font:"poison",
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

const createBuffer = (file) => {
    fs.readFile(file, (err, data) => {
        if (err) throw error;
        console.log(data);
        return data;
    });
}

const run = async () => {
    //show script intro
    init ();
    //ask user for a filepath
    let file = "badFilePath";
    //check to see if a file exists at the filepath
    file = await askForFile();
    while (!fs.existsSync(`${file.FILENAME}`)){
        console.log('the filepath you entered was invalid, make sure you are entering the path relative to the current state of the terminal');
        file = await askForFile();
    };

    //create a buffer for the file
    console.log(typeof file.FILENAME);
    const buffer = createBuffer(`${file.FILENAME}`);

    //attach the buffer to the body of the request
};
run();

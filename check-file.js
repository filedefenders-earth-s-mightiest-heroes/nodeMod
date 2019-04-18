'use strict';

const inquirer = require("inquirer");
const resolve = require('path').resolve;
const fs = require("fs");


module.exports.check = async (arg = "badFilePath") => {
//check to see if a file exists at the filepath
    let file = {}
    file.FILENAME = arg;
    if (file.FILENAME === 'badFilePath' || !fs.existsSync(`${file.FILENAME}`) || !fs.statSync(file.FILENAME).isFile()) {

        file = await askForFile();
// Andrew - ensure file exists and is a file rather than directory, symlink, etc...
        while (!fs.existsSync(`${file.FILENAME}`) || !fs.statSync(file.FILENAME).isFile()) {
            // console.log(fs.statSync(file.FILENAME).isFile());
            console.log('the filepath you entered was invalid, ensure it is a file not a directory');
            file = await askForFile();
        }
    }
// Andrew - resolve relative paths to absolute
        file.FILENAME = resolve(file.FILENAME);
        return file.FILENAME;

    }

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







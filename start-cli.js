'use strict';

const chalk = require("chalk");
const figlet = require("figlet");


module.exports.init = () => {
    console.log(
        chalk.blue(
            figlet.textSync('Check Me Out', {
                font: "Poison",
                horizontalLayout: "default",
                verticalLayout: "default"
            })));
    return true;
};

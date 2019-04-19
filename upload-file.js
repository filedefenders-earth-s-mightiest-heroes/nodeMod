'use strict';

require('dotenv').config();

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const resolve = require('path').resolve;
const superagent = require('superagent');
const http = require('https');
const fs = require("fs");
const endGame = require('./end-cli');

// This are the allowed file extensions
const support = ['PDF', 'DOCX', 'DOCM', 'DOTX', 'DOTM', 'XLSB', 'XLSX', 'XLSM', 'PPTX', 'PPTM', 'PPSX', 'RTF', 'BMP',
     'PNG', 'JPG', 'JPEG', 'EPS', 'GIF', 'SVG', 'TIFF', 'TIF', 'HTM', 'HTML', 'XML', 'HWP', 'JTD', 'OTD', 'DWG'];


// This function enables you to parse a relative file path and it accesses the api key and returns the id and file path
module.exports.upload = (file) => {

    let ext = file.split('.');

    if (support.includes(ext[1].toUpperCase())){
        superagent.post('https://api.metadefender.com/v4/file')
            .set('rule', 'sanitize')
            //connor - if filetype scrubbing is supported, set rule for sanitize:
            .set('apikey', `${process.env.API_KEY}`)
            .set('Content-Type', 'application/octet-stream')
            .send(file)
            .then(res => {
                getReport(res.body.data_id, file);
            })
            .catch(console.log);
    }else{
        superagent.post('https://api.metadefender.com/v4/file')
        //connor - if filetype scrubbing is supported, set rule for sanitize:
            .set('apikey', `${process.env.API_KEY}`)
            .set('Content-Type', 'application/octet-stream')
            .send(file)
            .then(res => {
                getReport(res.body.data_id, file);
            })
            .catch(console.log);
    }

    const getReport = (dataId, file) => {
  superagent.get(`https://api.metadefender.com/v4/file/${dataId}`)
    .set('apikey', `${process.env.API_KEY}`)
    .then(res => {
      let progress = res.body.scan_results.scan_all_result_a;
      if (progress === 'In Progress'){
        getReport(dataId, file);
      }else{
        let report = {
          status: progress,
          ID:dataId,
          filePath:file
        };
        endGame.end(report);
      }
    })
    .catch(console.log);
};


}




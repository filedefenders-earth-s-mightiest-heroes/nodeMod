'use strict';

const start = require('../start-cli');
const checkFile = require('../check-file');


// Test for start-cli file

describe('Testing to see if the start function executes true',() => {
    it('should pass true', () => {
        expect(start.init()).toBe(true);
    });

});

describe('Checking for a file from a user', () => {
    it('should check if a user enters a badfile', () => {
        expect(checkFile.check('/Users/JeromeJoof/codefellows/401/nodeMod/README.md')).toBeTruthy();
    })
})
# nodeMod
![CF](http://i.imgur.com/7v5ASc8.png) command line front end node module
==========================================================

### Author: Jerome Joof, Richard bellamy, Connor Sihon, Andrew Davis, Gurinder Batth

## Project Scope
* Allow a user to send a file to the metadefender API through an easy to use terminal UX, which connects to an azure hosted api that will gather data from metadefender to let the user know whether they have a compromised file.


## Links and Resources
* [Repo](https://github.com/filedefenders-earth-s-mightiest-heroes)
* [Heroku](https://dashboard.heroku.com/apps/check-me-out-n12)


## Modules
* upload-file.js
* check-file.js


## Installing 
* Clone this repo > git clone 

* enter the directory in your terminal
   *  run "cd checkmeout-cli"
   
 * run npm i
   
* run "npm link" in your terminal 


## Running the app

* enter checkmeout in your terminal

* enter the path of the file that needs to be checked relative to the current location in your terminal

* this app runs the file path and sanitizes it. If the file is corrupted it lets you know.
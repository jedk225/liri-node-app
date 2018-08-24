//code to read and set any environment variables with the dotenv package
require("dotenv").config();

//required to import the `keys.js` file
var keys = require("./keys.js");

var request = require("request");
var spotify = require("spotify");
var moment = require("moment")
var dotenv = require("dotenv");
var fs = require("fs");


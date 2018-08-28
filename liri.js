//code to read and set any environment variables with the dotenv package
require("dotenv").config();

//required to import the `keys.js` file
var keys = require("./keys.js");

var request = require("request");
var spotify = require("spotify");
var moment = require("moment")
var dotenv = require("dotenv");
var fs = require("fs");

var command = process.argv[2];
//console.log(command);
var queryName = process.argv.slice(3).join("+");


//concert-this
var concertURL = "https://rest.bandsintown.com/artists/" + queryName + "/events?app_id=codingbootcamp";

//movie-this
var queryUrl = 'http://www.omdbapi.com/?t=' + queryName + '&y=&plot=short&apikey=trilogy'


if (command === "concert-this") {
    request(concertURL, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if (response.statusCode === 200) {
            var concertDate = JSON.parse(body)[0].datetime; //Date of the concert
            var dateFormat = "YYYY-DD-MMThh:mm:ss"; //Original date format
            var convertedDate = moment(concertDate, dateFormat); //converted dat format using moment

            console.log("----------------"); // Print break.
            console.log('Artist:', JSON.parse(body)[0].lineup[0]); // Print the Venue.
            console.log(""); // Print space.
            console.log('Venue Name:', JSON.parse(body)[0].venue.name); // Print the Venue.
            console.log(""); // Print space.
            console.log('Venue Location:', JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region); // Print the location.
            console.log(""); // Print space.
            console.log('Venue Date:', moment(convertedDate).format("MM/DD/YY")); // Print the Date.
            console.log("----------------"); // Print break.

        }

    });
}
else if (command === "movie-this") {
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if (response.statusCode === 200) {
            console.log('Title:', JSON.parse(body).Title); // Print title.
            console.log(""); // Print space.
            console.log('Release Year:', JSON.parse(body).Year); // Print Year.
            console.log(""); // Print space.
            console.log('IMDB Rating:', JSON.parse(body).imdbRating); // Print IMDB Rating.
            console.log(""); // Print space.
            console.log('Rotten Tomatoes:', JSON.parse(body).Ratings[1].Value); // Print Rotten Tomatoes Score.
            console.log(""); // Print space.
            console.log('Country:', JSON.parse(body).Country); // Print Country.
            console.log(""); // Print space.
            console.log('Language:', JSON.parse(body).Language); // Print Language.
            console.log(""); // Print space.
            console.log('Plot:', JSON.parse(body).Plot); // Print Plot.
            console.log(""); // Print space.
            console.log('Actors:', JSON.parse(body).Actors); // Print Actors.
            console.log("----------------"); // Print break.

        }

    });
}
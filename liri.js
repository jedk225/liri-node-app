//code to read and set any environment variables with the dotenv package
require("dotenv").config();

//required to import the `keys.js` file
var keys = require("./keys.js");

var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require("moment")
var dotenv = require("dotenv");
var fs = require("fs");

//LIRI command grabbed from the command line
var command = process.argv[2];
//User input grabbed from the command line concatenated with a '+' sign
var queryName = process.argv.slice(3).join("+");


//concert-this queryURL global
var concertURL = "https://rest.bandsintown.com/artists/" + queryName + "/events?app_id=codingbootcamp";

//movie-this queryURL global
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

    if (!queryName) {
        request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy', function (error, response, body) {
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

    else {
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
}

else if (command === "spotify-this-song") {

    var spotify = new Spotify({
        id: "39b64e92daab4cb6a56677a5e661c38d",
        secret: "0674037de00a4e6ab6b4ce0a9b44e67c"
    });

    if (!queryName) {
        spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("----------------"); // Print break.
            //console.log(data.tracks.items[0]);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log(""); // Print space.
            console.log("Title: " + data.tracks.items[0].name);
            console.log(""); // Print space.
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log(""); // Print space.
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("----------------"); // Print break.

        });
    }

    else {
        spotify.search({ type: 'track', query: queryName }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("----------------"); // Print break.
            //console.log(data.tracks.items[0]);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log(""); // Print space.
            console.log("Title: " + data.tracks.items[0].name);
            console.log(""); // Print space.
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log(""); // Print space.
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("----------------"); // Print break.

        });
    }
}

else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        var doThisCommand = dataArr[0];
        var doThisQuery = dataArr[1];

        if (doThisCommand === "spotify-this-song") {
            var spotify = new Spotify({
                id: "39b64e92daab4cb6a56677a5e661c38d",
                secret: "0674037de00a4e6ab6b4ce0a9b44e67c"
            });

            spotify.search({ type: 'track', query: doThisQuery }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log("----------------"); // Print break.
                //console.log(data.tracks.items[0]);
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log(""); // Print space.
                console.log("Title: " + data.tracks.items[0].name);
                console.log(""); // Print space.
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log(""); // Print space.
                console.log("Preview Link: " + data.tracks.items[0].preview_url);
                console.log("----------------"); // Print break.
            });
        }
    });
}
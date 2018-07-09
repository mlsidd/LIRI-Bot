// Get all of the modules that are required for this to work
const dotenv = require('dotenv').config();
const keys = require("./keys");
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

// Get my keys/id's
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const omdbkey = "trilogy";

// console.log(spotify);
// console.log(client);

// Get the user input from the command line
var args = process.argv;
var liriRequest = args[2];
// console.log(args);

// Declare the variables for song name, movie name
var songName = args[3];
var movieName = args[3];
var queryURL = "https://www.omdbapi.com/?apikey=" +omdbkey+ "&plot=short&y=&tomatoes=";

// Take in user input of a song name (spotify-this-song) and output spotify song information
function spotifyRequest() {
    // Create a for loop to grab multiple words if song is more than one word
    for (var i=4; i<args.length; i++) {
        songName = songName + " " + args[i];
    }
        // console.log("The song you entered is:  " + songName);
        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
                console.log("Artist:  " + data.tracks.items[0].album.artists[0].name);
                console.log("Song Name:  " + data.tracks.items[0].name);
                console.log("Link to Spotify:  " + data.tracks.items[0].album.external_urls.spotify);
                console.log("Album name:  "+ data.tracks.items[0].album.name);
              });
    };

// Take in user input of a movie name (movie-this) and output IMDB movie information
function movieInfoRequest() {
// Create a for loop to grab all words in movie title
    for (var i=4; i<args.length; i++) {
        movieName = movieName + " " + args[i];
    }

    // console.log("The movie you entered is:  " + movieName);

    queryURL = queryURL + "&t=" + movieName;

    request(queryURL, function (error, response, body) {
        if(error != null) {
            console.log('error:', error); // Print the error if one occurred
        } else {

            // console.log(body);

        console.log('Title:  ' + JSON.parse(body).Title); 
        console.log('Year:  ' + JSON.parse(body).Year);
        console.log(JSON.parse(body).Ratings[0].Source + ":  " + JSON.parse(body).Ratings[0].Value);
        console.log(JSON.parse(body).Ratings[1].Source + ":  " + JSON.parse(body).Ratings[1].Value);
        console.log('Country:  ' + JSON.parse(body).Country);
        console.log('Language:  ' + JSON.parse(body).Language);
        console.log('Plot:  ' + JSON.parse(body).Plot);
        console.log('Actors:  ' + JSON.parse(body).Actors);
        }
    });
}

// User types my-tweets and outputs last 20 tweets
function twitterRequest() {

};

// User types do-what-it-says and uses the text in random.txt file to perform one of the 3 liri commands and outputs result
function randomRequest() {

};

// Create switch statement to perform one of the liri commands based on what user types
switch (liriRequest) {
    case "spotify-this-song":
        spotifyRequest();
        break;
    case "movie-this":
        movieInfoRequest();
        break;
    case "my-tweets":
        twitterRequest();
        break;
    case "do-what-it-says":
        randomRequest();
}        



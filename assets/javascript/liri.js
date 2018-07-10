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

// Get the user input from the command line
var args = process.argv;
var liriRequest = args[2];
// Get the user input from index 3 to determine if the user entered a song or movie name
var firstInput = args[3];
var songInfo = "";
var movieName = "";
var loggingInfo = "";

// Set default song and movie in case user does not input these
    if(firstInput == null) {
        songInfo = "The Sign Ace of Base";
        movieName = "Mr. Nobody";
        var movieMessage = "If you haven't watched 'Mr. Nobody,' then you should: " + "\n" + "https://www.imdb.com/title/tt0485947/";
        loggingInfo = liriRequest;
    } else {
        for(var i=3; i<args.length; i++) {
            songInfo = songInfo + " " + args[i];
            movieName = movieName + " " + args[i];
            loggingInfo = loggingInfo + " " + args[i];
        }
        loggingInfo = liriRequest + loggingInfo;
    }

// console.log("logging info:" + loggingInfo);

// Create the url to use in the OMDB request
var queryURL = "https://www.omdbapi.com/?apikey=" +omdbkey+ "&plot=short&y=&tomatoes=&t=" + movieName;

// Take in user input of a spotify-this-song and a song name and output spotify song information
function spotifyRequest() {
    // Request to get the spotify song information
    spotify.search({ type: 'track', query: songInfo}, function(error, data) {
        if (error) {
        return console.log('error occurred: ' + error);
        }
        // Output only the track information that is wanted
        console.log("Artist:  " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name:  " + data.tracks.items[0].name);
        console.log("Link to Spotify:  " + data.tracks.items[0].album.external_urls.spotify);
        console.log("Album name:  "+ data.tracks.items[0].album.name);
    });
};

// Take in user input of movie-this and a movie name and output IMDB movie information
function movieInfoRequest() {
        // Request to OMDB API
        request(queryURL, function (error, response, body) {
            if(error != null) {
                console.log('error:', error); // Print the error if one occurred
            } else {
                // console.log(body);
            // Output all of the movie information
            if(firstInput == null) {console.log(movieMessage)};
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
    };

// User types my-tweets and outputs last 20 tweets
function twitterRequest() {
    // request to get the tweets from my twitter account
    var tweets = client.get('statuses/user_timeline',  { screen_name: 'Melissa77448753', count: 20 }, searchedData);
    return tweets;
    console.log(tweets);
};

// Callback function to be used in the twitter request above
function searchedData(error, data, response) {
    // for loop to get each of the 20 most recent tweets
    for (var t=0; t<data.length && t<21; t++) {
        console.log("Tweet:  " + data[t].text); // tweet
        console.log("Created at:  " + data[t].created_at); // date/time created
    }
};

// User types do-what-it-says and uses the text in random.txt file to perform one of the 3 liri commands and outputs result
function randomRequest() {
    // Read from the "random.txt" file.
    fs.readFile("../random.txt", "utf8", function(error, data) {
        // Log error if occurs
        if (error) {
            return console.log(error);
        }
        // Put the contents of data inside a variable
        console.log(data);
        // Get only the song title and put into a variable
        var randomText = data.slice(data.indexOf(',') + 2);
        // console.log(randomText);

        // Set the variable songInfo to equal the randomText song
        songInfo = randomText;
        // Run the spotify function
        spotifyRequest();
        logEachCommand();
    });
}

// Create switch statement to perform one of the liri commands based on what user types
switch (liriRequest) {
    case "spotify-this-song":
        spotifyRequest();
        logEachCommand();
        break;
    case "movie-this":
        movieInfoRequest();
        logEachCommand();
        break;
    case "my-tweets":
        twitterRequest();
        logEachCommand();
        break;
    case "do-what-it-says":
        randomRequest();
        logEachCommand();
};

// BONUS - Create a new textfile named log.txt that we can log all commands that are input
function logEachCommand() {
    fs.appendFile("log.txt", loggingInfo + "\n", function(error) {
        // Check for errors
        if (error) {
            console.log(error);
        }
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added to log.txt.");
        }        
        });  
}
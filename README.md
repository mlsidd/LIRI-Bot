# LIRI-Bot

## Purpose
This was created to act similar to Siri from Apple.  The user can enter commands on the command line and receive information back based on what they entered.

## My Approach
I utilized node.js, Twitter API, Spotify API, OMDB API, the request npm package to make my https request to OMDB, and the file system module from node to write to my log.txt file.  I wrote my JavaScript code in Visual Studio Code.  My code grabs user input using process.argv and puts that information into variables that are then used to get back information from the various API's.  This output is displayed in the command line using console.log.  I also add each command line user input into the log.txt file.  

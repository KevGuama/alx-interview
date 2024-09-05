#!/usr/bin/node

const request = require('request');

// Get the movie ID from the command line arguments
const movieId = process.argv[2];

// Define the URL for the Star Wars API for the movie ID
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

// Make a request to the Star Wars API to get the movie details
request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error fetching movie data:', error);
    return;
  }

  // Parse the response body as JSON
  const movieData = JSON.parse(body);

  // Get the list of character URLs from the movie data
  const characterUrls = movieData.characters;

  // For each character URL, make a request to get the character's name
  characterUrls.forEach((characterUrl) => {
    request(characterUrl, (error, response, body) => {
      if (error) {
        console.error('Error fetching character data:', error);
        return;
      }

      // Parse the character data
      const characterData = JSON.parse(body);

      // Print the character's name
      console.log(characterData.name);
    });
  });
});

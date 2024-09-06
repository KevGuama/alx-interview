#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2]; // Get the movie ID from the command-line arguments
const filmEndPoint = `https://swapi-api.hbtn.io/api/films/${movieId}`; // Construct API endpoint

// Function to fetch the movie's characters
const getCharacters = async () => {
  request(filmEndPoint, async (err, res, body) => {
    if (err || res.statusCode !== 200) {
      console.error(`Error fetching film data: ${err}`);
      return;
    }

    const filmData = JSON.parse(body);
    const characterUrls = filmData.characters;
    
    // Fetch each character's name using Promise.all for concurrency
    const characterNames = await Promise.all(characterUrls.map(url => fetchCharacterName(url)));
    
    // Print each character name
    characterNames.forEach(name => console.log(name));
  });
};

// Helper function to fetch a character's name from their URL
const fetchCharacterName = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        console.error(`Error fetching character data: ${err}`);
        reject(err);
      } else {
        const characterData = JSON.parse(body);
        resolve(characterData.name);
      }
    });
  });
};

// Start fetching the characters
getCharacters();

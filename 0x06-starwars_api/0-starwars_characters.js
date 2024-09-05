#!/usr/bin/node

const request = require('request');

// Get the movie ID from the command line arguments
const movieId = process.argv[2];

// Define the movie API endpoint
const filmEndPoint = 'https://swapi-api.hbtn.io/api/films/' + movieId;

// Function to fetch movie details and get the character URLs
const getCharacters = async () => {
  return new Promise((resolve, reject) => {
    request(filmEndPoint, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject(new Error(`Error: ${err} | StatusCode: ${res ? res.statusCode : 'unknown'}`));
      } else {
        const jsonBody = JSON.parse(body);
        resolve(jsonBody.characters);
      }
    });
  });
};

// Function to fetch character names from a list of character URLs
const getCharacterNames = async (characters) => {
  // Use Promise.all to fetch all character names in parallel
  const promises = characters.map((url) => {
    return new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        if (err || res.statusCode !== 200) {
          reject(new Error(`Error: ${err} | StatusCode: ${res ? res.statusCode : 'unknown'}`));
        } else {
          const jsonBody = JSON.parse(body);
          resolve(jsonBody.name);
        }
      });
    });
  });

  // Wait for all character requests to complete and return the names
  return Promise.all(promises);
};

// Main function to coordinate the fetching and printing of characters
const printCharacterNames = async () => {
  try {
    // Step 1: Get the characters for the movie
    const characters = await getCharacters();

    // Step 2: Fetch all character names in parallel
    const names = await getCharacterNames(characters);

    // Step 3: Print each character's name in order
    names.forEach((name, index) => {
      if (index === names.length - 1) {
        process.stdout.write(name);
      } else {
        process.stdout.write(name + '\n');
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Execute the main function
printCharacterNames();

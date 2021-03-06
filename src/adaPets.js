// Use Node-style imports for dependencies.
const axios = require('axios');
const result = require('./result.js');

const setResult = result.setResult;
const setError = result.setError;

// Every helper function should make sure to call setResult or setError before each return.

const BASE_URL = 'http://localhost:3000/pets/';

// Option functions.
// Wave 1: Make a call to the Pets API and should setResult a list of objects containing (at least) the pet's id and name and should call setError with an error message if the request fails.
const listPets = () => {
  axios.get(BASE_URL)
    .then((response) => {
      setResult(response.data); // setResult should be passed the array of pets.
    })
    .catch((error) => {
      setError('Oops. It did not list pets.'); // setError should be passed an error message. (You may need to write this message.)
    })
};

// Wave 2: We now want to be able to look at individual pets. This will need to make a call to the Pets API and should setResult and object with details for the pet and should call setError with an error message if the request fails.

const showDetails = (selectedPetId) => {
  if (!selectedPetId) {
    setError("You tried to show details for a pet without selecting it!");

  } else {
    axios.get(BASE_URL + selectedPetId)
      .then((response) => {
        setResult(response.data); 
      })
      .catch((error) => {
        setError(`Oops. Your request failed. Error code: ${error.response.status}`); 
      })
  }

};

// Wave 3: Once a pet is adopted we don't still want to show it on the list.

// Fill out the removePet function. This will need to call to the Pets API to remove the pet. This should setResult with a success message if this works and should call setError with an error message if the request fails.

const removePet = (selectedPetId) => {
  if (!selectedPetId) {
    setError("You tried to remove a pet without selecting it!");
  } else {
    axios.delete(BASE_URL + selectedPetId)
      .then((response) => {
        setResult('The pet with ID #: ${selectedPetId} was removed.'); 
      })
      .catch((error) => {
        setError(`Oops. Your request to remove failed. Error code: ${error.response.status}`); 
      })
  }

};

// Wave 4: Sometimes we'll have new pets that want to be adopted.

// Fill out the addPet function. This will need to call the Pets API to add the pet. This should setResult with a success message if this works and should call setError with an error message if the request fails.

const addPet = (petInfo) => {
  axios.post(BASE_URL, petInfo)
      .then((response) => {
        setResult(response.data); 
      })
      .catch((error) => {
        setError(`Oops. Your request to add a pet failed. Error code: ${error.response.status}`); 
      })
};

// Use Node-style exports to export functions for tests and main.
module.exports = {
  listPets,
  showDetails,
  removePet,
  addPet
};

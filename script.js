import firebaseInfo from "./firebase.js";

import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// initialize db content
const database = getDatabase(firebaseInfo);
// create reference to db content
const dbref = ref(database);

// JS begins for MVP --> track them movies

// create variables for what elements we will be using
const formElement = document.querySelector('form');
const ulElement = document.querySelector('.listOfMovies')

// add event listener to our form

const submitHandler = function(event){
    // prevent form from refreshing
    event.preventDefault()

    // create variable userInput
    const userInput = document.querySelector('#inputMovieTitle');
    // create a variable for the value of userInput
    const movieInput = userInput.value.trim();
// ********** create variable for rating *************
    const ratingSelect = document.querySelector('#rating-select');
    // *** create value for rating
    const ratingValue = ratingSelect.value;
// ****************************************************

    if (movieInput) {
        const movieObj = {
            movieTitle: movieInput,
// ********* ADDED RATING to be sent to firebase w/ movie title ************
            // rating: document.querySelector('rating-select'),
            rating: ratingValue
// *****************************************************
    };

        push(dbref, movieObj)

        // return value of userInput to empty string
        userInput.value('');
    }
    // now we have to push the value of userinput to firebase db

}

formElement.addEventListener('submit', submitHandler)

// end of form event listner

// start of onValue module to track userInputs in REAL TIME

onValue(dbref, (data) => {

    // make a variable that contains data, using .val() to take a snapshot of the data
    const movieData = data.val();
    
    // make an empty array which will add each movie title user enters
    const movieArray = [];

    for (let prop in movieData){
        // create new li element
        const liElement = document.createElement('li');
        // console.log(data[prop])
// ********** Changed (movieData[prop].movieTitle) to curly to add word Rating***
        liElement.textContent = `${movieData[prop].movieTitle} - Rating: ${movieData[prop].rating}`;
        // push li element into movieArray we created above
        movieArray.push(liElement.outerHTML)
    }
    ulElement.innerHTML = movieArray.join('')



    // In the context of Firebase Realtime Database, the .exists property is used to check whether a document or snapshot exists in the database.

})



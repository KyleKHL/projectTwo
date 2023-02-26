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
    const userInput = document.getElementById('movieTitle');
    // create a variable for the value of userInput
    const movieInput = userInput.value;

    if (movieInput) {
        const movieObj = {
            movieTitle: movieInput,
        };

        push(dbref, movieObj)
    }
    // now we have to push the value of userinput to firebase db

    // return value of userInput to empty string
    formElement.reset();

}

formElement.addEventListener('submit', submitHandler)
// end of form event listner

// start of onValue module to track userInputs in REAL TIME

onValue(dbref, (data) => {
    // In the context of Firebase Realtime Database, the .exists property is used to check whether a document or snapshot exists in the database.
    if(data.exists()){
        const liElement = document.createElement('li')

        // using get module to get our movie!
        // get(dbref).then((snapshot) => {

        // })

        liElement.textContent = data.val();
        ulElement.appendChild(liElement);
    }else{
        // tell the user there are no movies in the list somehow
    }
})
import firebaseInfo from "./firebase.js";

import { getDatabase, ref, push, onValue, get, remove, child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// initialize db content
const database = getDatabase(firebaseInfo);
// create reference to db content
const dbRef = ref(database);

// JS begins for MVP --> track them movies

// create variables for what elements we will be using
const formElement = document.querySelector('form');
const ulElement = document.querySelector('.listOfMovies')

// add event listener to our form

const submitHandler = function(event){
    // prevent form from refreshing
    event.preventDefault();

    // create variable userInput
    const userInput = document.querySelector('#inputMovieTitle');
    // create a variable for the value of userInput
    const movieInput = userInput.value.trim();

    if (movieInput) {
        const movieObj = {
            movieTitle: movieInput,
        };

        push(dbRef, movieObj)

        // return value of userInput to empty string
        userInput.value = '';
    }
    // now we have to push the value of userinput to firebase db

}

formElement.addEventListener('submit', submitHandler)
// end of form event listner

// start of onValue module to track userInputs in REAL TIME

onValue(dbRef, (data) => {

    // make a variable that contains data, using .val() to take a snapshot of the data
    const movieData = data.val();
    
    // make an empty array which will add each movie title user enters
    const movieArray = [];

    for (let prop in movieData){
        // create new li element
        const liElement = document.createElement('li');
        // create variable to contain each movieObj
        const propObj = prop;

        // assign the id of each element with it's prop value -> the auto gen key
        liElement.setAttribute("id", propObj);

        // create new delete button
        const deleteButton = document.createElement('button');
        // add the fotn awesome 'x' icon
        deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        // give it class to give it a style
        deleteButton.classList.add("deleteButton");

        // create textnode with movie title contained in a variable
        const movieTitleTextNode = document.createTextNode(movieData[prop].movieTitle);
        // append the text node and delete button to the li
        liElement.append(movieTitleTextNode, deleteButton)

        // push li element into movieArray we created above
        movieArray.push(liElement.outerHTML)

    }
    ulElement.innerHTML = movieArray.join('')

})



// Use Event propagation to attach event listener to ul element in order to then use conditional statement to target the button of each li element
ulElement.addEventListener('click', (event) => {

    const removeFunc = (removeLi) => {
        const liRef = ref(database, `/${removeLi}`)
        remove(liRef);
    }

    if (event.target.tagName === 'I') {
        const selectedLiId = event.target.parentElement.parentElement.id;
        console.log('FIRE!', event.target.tagName, selectedLiId)

            removeFunc(selectedLiId)

        } else if (event.target.tagName === 'BUTTON') {
        const selectedLiId = event.target.parentElement.id;

        console.log('FIRE!', event.target.tagName, selectedLiId)

        removeFunc(selectedLiId)
    }

});
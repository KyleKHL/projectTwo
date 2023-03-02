import firebaseInfo from "./firebase.js";

import { getDatabase, ref, push, onValue, get, remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// initialize db content
const database = getDatabase(firebaseInfo);
// create reference to db content
const dbRef = ref(database);

console.log(ref(database).object)

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
    const movieInput = userInput.value;

    if (movieInput) {
        const movieObj = {
            movieTitle: movieInput,
        };

        push(dbRef, movieObj)

        // return value of userInput to empty string
        formElement.reset();
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
        
        // create new delete button
        const deleteButton = document.createElement('button');
        // give it class to give it a style
        deleteButton.classList.add("deleteButton");

        // create textnode with movie title contained in a variable
        const movieTitleTextNode = document.createTextNode(movieData[prop].movieTitle)
        // append the text node and delete button to the li
        liElement.append(movieTitleTextNode, deleteButton)

        // push li element into movieArray we created above
        movieArray.push(liElement.outerHTML)
    }
    ulElement.innerHTML = movieArray.join('')

})

// Use Event propagation to attach event listener to ul element in order to then use conditional statement to target the button of each li element
ulElement.addEventListener('click', (event) => {
    
    // console.log(event.target.parentElement)

    if(event.target.tagName === 'BUTTON'){
            // console.log(event.target.parentElement)
            // const liToBeDeleted = event.target.parentElement;

            liToBeDeleted.remove();
    }
});

// Get a snapshot of all data
get(dbRef).then((snapshot) => {
    // console.log()
    if (snapshot.exists()) {
        console.log(snapshot.val())
        
    } else {
        console.log('No data available')
    }
})

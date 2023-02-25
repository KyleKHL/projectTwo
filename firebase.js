// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVJ-2swgzEpo0Ps9zM3J6mgV6w0oBEopc",
    authDomain: "reelmovietracker.firebaseapp.com",
    databaseURL: "https://reelmovietracker-default-rtdb.firebaseio.com",
    projectId: "reelmovietracker",
    storageBucket: "reelmovietracker.appspot.com",
    messagingSenderId: "280709635162",
    appId: "1:280709635162:web:76aba4418e6242b5200c63"
};

// Initialize Firebase
const firebaseInfo = initializeApp(firebaseConfig);

export default firebaseInfo;
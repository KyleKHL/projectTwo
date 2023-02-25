import firebaseInfo from "./firebase.js";

import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// initialize db content
const database = getDatabase(firebaseInfo);
// create reference to db content
const dbref = ref(database);
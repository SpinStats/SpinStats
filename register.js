// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebase/8.10.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4e3wipY2_Y9q5bYrABW5OzNcn-PHh220",
  authDomain: "spinstats-da786.firebaseapp.com",
  projectId: "spinstats-da786",
  storageBucket: "spinstats-da786.firebasestorage.app",
  messagingSenderId: "68347392940",
  appId: "1:68347392940:web:838875cb8293c1ea9ac009"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


const submit = document.getElementById('submit');


submit.addEventListener("click", function (event) {
    event.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed up 
    const user = userCredential.user;
    alert("Creating account...")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
})
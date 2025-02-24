import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAV14QlmcAioGFcE-jFHWVv-hkm8PBF1T0",
    authDomain: "spinstats-5c856.firebaseapp.com",
    projectId: "spinstats-5c856",
    storageBucket: "spinstats-5c856.appspot.com",
    messagingSenderId: "864688951679",
    appId: "1:864688951679:web:6856d7f8100bc60057ca4a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById("google-btn");

googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

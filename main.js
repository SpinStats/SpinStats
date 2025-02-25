    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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

    document.getElementById("register-btn").addEventListener("click", function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "index.html";
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    });

    document.getElementById("google-btn").addEventListener("click", function() {
        signInWithPopup(auth, provider)
            .then(() => {
                window.location.href = "index.html";
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    });

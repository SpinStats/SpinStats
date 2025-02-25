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

// Verificar si hay usuario en localStorage y actualizar el perfil
document.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        updateProfile(JSON.parse(storedUser));
    }
});

// Registro con correo y contraseña
document.getElementById("register-btn")?.addEventListener("click", function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const username = document.getElementById("username").value.trim();

    if (email && password && username) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const user = { username, email };
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "index.html"; // Redirige a la página principal
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Inicio de sesión con Google
document.getElementById("google-btn")?.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const googleEmail = result.user.email;
            const username = googleEmail.replace("@gmail.com", ""); // Quita @gmail.com

            const user = { username, email: googleEmail };
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "index.html"; // Redirige a la página principal
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
});

// Función para actualizar el perfil en la página
function updateProfile(user) {
    const profileSection = document.getElementById("profile");
    if (profileSection) {
        profileSection.innerHTML = `
            <p><strong>Perfil</strong></p>
            <p>Usuario: ${user.username}</p>
            <p>Correo: ${user.email}</p>
            <button id="logout-btn">Cerrar sesión</button>
        `;

        document.getElementById("logout-btn").addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.reload();
        });
    }
}

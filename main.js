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

// Verificar si hay usuario en localStorage y mostrar perfil
document.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        showUserProfile(JSON.parse(storedUser));
    }
});

// Registro con correo y contraseña
document.addEventListener("DOMContentLoaded", () => {
  // Asegurarse de que los elementos existen antes de acceder a ellos
  const registerBtn = document.getElementById("register-btn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!registerBtn || !emailInput || !passwordInput) {
      console.error("No se encontraron los elementos en el DOM.");
      return;
  }

  registerBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (email && password) {
          createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  const user = { email: userCredential.user.email };
                  localStorage.setItem("user", JSON.stringify(user));
                  console.log("Registro exitoso, redirigiendo a index.html");
                  window.location.href = "index.html";
              })
              .catch(error => {
                  console.error("Error en el registro:", error);
                  alert("Error: " + error.message);
                  window.location.href = "index.html";
              });
      } else {
          alert("Por favor, completa todos los campos.");
      }
  });
});


// Inicio de sesión con Google
document.getElementById("google-btn")?.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const googleEmail = result.user.email;
            const username = googleEmail.replace("@gmail.com", ""); // Elimina @gmail.com

            const user = { username, email: googleEmail };
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "index.html"; // Redirige a la página principal
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
});

// Función para mostrar el perfil del usuario
function showUserProfile(user) {
    const cardContainer = document.querySelector(".card-container");
    if (cardContainer) {
        cardContainer.innerHTML = `
            <div class="card">
                <h3>Bienvenido, ${user.username}!</h3>
                <p>Correo: ${user.email}</p>
                <button id="logout-btn">Cerrar sesión</button>
            </div>
        `;

        document.getElementById("logout-btn").addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.reload();
        });
    }
}

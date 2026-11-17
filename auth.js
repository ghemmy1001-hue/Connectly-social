import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

import { firebaseAuth, firebaseDB } from "./firebase-config.js";

const $ = id => document.getElementById(id);

const loginTab = $("loginTab");
const signupTab = $("signupTab");
const signupFields = $("signupFields");
const submitBtn = $("submitBtn");
const authForm = $("authForm");
const message = $("message");

let mode = "login";

function setMode(newMode) {
  mode = newMode;

  const signingUp = mode === "signup";

  signupFields.hidden = !signingUp;
  $("fullName").required = signingUp;
  $("username").required = signingUp;

  loginTab.classList.toggle("active", !signingUp);
  signupTab.classList.toggle("active", signingUp);

  submitBtn.textContent = signingUp ? "Create Account" : "Login";

  $("switchText").textContent = signingUp
    ? "Already have an account? Select Login."
    : "New to Connectly? Select Sign Up.";

  $("password").autocomplete =
    signingUp ? "new-password" : "current-password";

  message.textContent = "";
}

loginTab.addEventListener("click", () => setMode("login"));
signupTab.addEventListener("click", () => setMode("signup"));

authForm.addEventListener("submit", async event => {
  event.preventDefault();

  submitBtn.disabled = true;
  message.textContent = "Please wait...";

  const email = $("email").value.trim();
  const password = $("password").value;

  try {
    if (mode === "signup") {
      const fullName = $("fullName").value.trim();
      const username = $("username").value.trim().toLowerCase();

      if (!/^[a-z0-9_]{3,20}$/.test(username)) {
        throw new Error(
          "Username must contain 3–20 letters, numbers or underscores."
        );
      }

      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: fullName
      });

      await setDoc(doc(firebaseDB, "profiles", credential.user.uid), {
        uid: credential.user.uid,
        username,
        fullName,
        email,
        createdAt: serverTimestamp()
      });

      message.textContent = "Account created! Opening Connectly...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);

    } else {
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      const profileRef = doc(
        firebaseDB,
        "profiles",
        credential.user.uid
      );

      const profile = await getDoc(profileRef);

      if (!profile.exists()) {
        message.textContent =
          "Your account exists, but its profile is missing. Please contact support.";
        return;
      }

      message.textContent = "Login successful! Opening Connectly...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }

  } catch (error) {
    const errors = {
      "auth/email-already-in-use": "This email is already registered.",
      "auth/invalid-email": "Enter a valid email address.",
      "auth/weak-password": "Choose a stronger password.",
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/network-request-failed": "Check your internet connection."
    };

    message.textContent =
      errors[error.code] || error.message;

  } finally {
    submitBtn.disabled = false;
  }
});

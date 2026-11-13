<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAsVVoyac11xZsmg-OJANwrOdD_2HuXBnA",
    authDomain: "connectly-media-f60d0.firebaseapp.com",
    projectId: "connectly-media-f60d0",
    storageBucket: "connectly-media-f60d0.firebasestorage.app",
    messagingSenderId: "756485725438",
    appId: "1:756485725438:web:225d4fc014f0fc388819af",
    measurementId: "G-XP6WX0HB2D"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

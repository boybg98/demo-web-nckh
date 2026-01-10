
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAcn4aZkmxlkBFcAEedpIm8uVZXLVqBHoQ",
    authDomain: "prjnckh2026webta.firebaseapp.com",
    projectId: "prjnckh2026webta",
    storageBucket: "prjnckh2026webta.firebasestorage.app",
    messagingSenderId: "11069984562",
    appId: "1:11069984562:web:bd9e853ff4b0e2c5ba112b",
    measurementId: "G-RTFG8VL0F0"
  };

 
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }
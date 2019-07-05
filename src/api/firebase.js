import app from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD3uWma_iug5o_0w6EmchIXp4qd054HqcE",
  authDomain: "realtime-checkers.firebaseapp.com",
  databaseURL: "https://realtime-checkers.firebaseio.com",
  projectId: "realtime-checkers",
  storageBucket: "realtime-checkers.appspot.com",
  messagingSenderId: "100295366319",
  appId: "1:100295366319:web:ec1c182d83b660e8"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDCGMshpf23cYv7tf5wAAzYdQgggRNv1Qc",
  authDomain: "sensors-visualisation.firebaseapp.com",
  projectId: "sensors-visualisation",
  storageBucket: "sensors-visualisation.appspot.com",
  messagingSenderId: "311441740818",
  appId: "1:311441740818:web:b17372da1cd0b09b8e74cb",
  measurementId: "G-X47EC00LJL"
};

export const app = initializeApp(firebaseConfig);
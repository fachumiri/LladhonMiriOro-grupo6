import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCLRiomUxLgcMK2obY6758mePCF3NXWbY0",
  authDomain: "proyectointegrador-f351c.firebaseapp.com",
  projectId: "proyectointegrador-f351c",
  storageBucket: "proyectointegrador-f351c.firebasestorage.app",
  messagingSenderId: "925876927278",
  appId: "1:925876927278:web:b56c5483584dd3740a18bf"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()
// de aca sale cuando importamos en los componentes db y auth
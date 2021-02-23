import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
import {key} from './key';

var firebaseConfig = {
    apiKey: key,
    authDomain: "tienda-juegos-a5ff5.firebaseapp.com",
    projectId: "tienda-juegos-a5ff5",
    storageBucket: "tienda-juegos-a5ff5.appspot.com",
    messagingSenderId: "504000455105",
    appId: "1:504000455105:web:e773968c768631a0c14f40"
};

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })

/*Para el logeo*/
export default {
  auth: firebase.auth(),
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function() {
      //console.log(result);
      
    })
    .catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
      })
  },
  logout() {
    firebase.auth().signOut()
    .then(function() {})
    .catch(function(error) {
      console.log(error)});
  },

  registrarseBD(email,password){

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Usuario creado: "+email)
      }).catch((error) => {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        
      });
  },

  loginCorreo(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Inicio de seion: "+email);
    })
    .catch((error) => {
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      return errorMessage;
    });
  }
}
import * as firebase from 'firebase';
import FIREBASE_CONFIG from './firebase_credential.js';

 export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
 export const billRef = firebase.database().ref('bills');
 export const dbRef = firebase.database();

import firebase from "firebase"
// import firebase from 'firebase/app'

// Get a RTDB instance
export const db = firebase
  .initializeApp({ databaseURL: 'https://meshitsukuba.firebaseio.com' })
  .database()
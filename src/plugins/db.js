import firebase from "firebase"

// Get a RTDB instance
export const db = firebase
  .initializeApp({ databaseURL: 'https://meshitsukuba.firebaseio.com' })
  .database()
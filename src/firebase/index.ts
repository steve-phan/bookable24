import firebase from "firebase/compat/app"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import "firebase/compat/firestore"
import { firebaseConfig } from "./firebaseConfig"

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
// export const auth = firebase.auth()

export default firebase

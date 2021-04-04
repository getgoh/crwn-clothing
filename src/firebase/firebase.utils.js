import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyASBZtwQ3DH-ZYHJDx9MxePpjNNtQQQC4s",
  authDomain: "crwn-db-bc7c6.firebaseapp.com",
  projectId: "crwn-db-bc7c6",
  storageBucket: "crwn-db-bc7c6.appspot.com",
  messagingSenderId: "1094839559354",
  appId: "1:1094839559354:web:4d78f96a3ac554134fce83",
  measurementId: "G-QMXVQKL2CD",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

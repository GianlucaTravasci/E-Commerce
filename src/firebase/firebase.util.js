import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCNkJnvAtKxXfvF5ob8koF9vAj13iunaYE",
    authDomain: "wishdress-db.firebaseapp.com",
    databaseURL: "https://wishdress-db.firebaseio.com",
    projectId: "wishdress-db",
    storageBucket: "wishdress-db.appspot.com",
    messagingSenderId: "780254202308",
    appId: "1:780254202308:web:21aca816d9b8674e9bfc91",
    measurementId: "G-0S8MT3GTWT"
}

firebase.initializeApp(firebaseConfig);

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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
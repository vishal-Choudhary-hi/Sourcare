import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyAKE5a9I3zXuRb2AphGV_SncD5WY9_49TA",
    authDomain: "mustic-f2dfc.firebaseapp.com",
    projectId: "mustic-f2dfc",
    storageBucket: "mustic-f2dfc.appspot.com",
    messagingSenderId: "906494830290",
    appId: "1:906494830290:web:3c936df3abf0c6a0582f0b"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore=firebase.firestore()
const projectAuth=firebase.auth()
const projectStorage=firebase.storage()
const timestamp=firebase.firestore.FieldValue.serverTimestamp
export {projectFirestore,projectAuth,projectStorage,timestamp}
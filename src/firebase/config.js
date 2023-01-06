import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
//Add fire base location
firebase.initializeApp(firebaseConfig)

const projectFirestore=firebase.firestore()
const projectAuth=firebase.auth()
const projectStorage=firebase.storage()
const timestamp=firebase.firestore.FieldValue.serverTimestamp
export {projectFirestore,projectAuth,projectStorage,timestamp}

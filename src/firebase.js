import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyBHlfuOVs1hdixR15XIzE3hfeoRdA7ja3c",
    authDomain: "reels-df4ae.firebaseapp.com",
    projectId: "reels-df4ae",
    storageBucket: "reels-df4ae.appspot.com",
    messagingSenderId: "620732051066",
    appId: "1:620732051066:web:0330ccaaf10fd5f4e995c3"
})
export const auth=firebase.auth()
const firestore=firebase.firestore()
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();
// export default firebase
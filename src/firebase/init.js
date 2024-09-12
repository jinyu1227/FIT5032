// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyClwzOlnWOFnZ8645wfQoczX45lrop2_3k',
  authDomain: 'week7-jinyu.firebaseapp.com',
  projectId: 'week7-jinyu',
  storageBucket: 'week7-jinyu.appspot.com',
  messagingSenderId: '583555641221',
  appId: '1:583555641221:web:1cfd6c3ef28c76f49adeec'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db

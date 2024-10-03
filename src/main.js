import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import PrimeVue from 'primevue/config'
// import Aura from '@primevue/themes/aura'

// const app = createApp(App)
// app.use(PrimeVue, {
//   theme: {
//     preset: Aura
//   }
// })

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
// const app = initializeApp(firebaseConfig)
//initializeApp(firebaseConfig)

createApp(App).use(router).mount('#app')

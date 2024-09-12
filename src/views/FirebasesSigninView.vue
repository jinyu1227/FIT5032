<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
  <p v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Sign-In Successful!')

    const user = userCredential.user
    if (user) {
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const userRole = userDoc.data().role
        console.log(`User Role: ${userRole}`)

        localStorage.setItem('userEmail', user.email)
        localStorage.setItem('userRole', userRole)

        if (userRole === 'teacher') {
          router.push('/')
        } else if (userRole === 'student') {
          router.push('/')
        } else if (userRole === 'guest') {
          router.push('/')
        } else {
          router.push('/')
        }
      } else {
        error.value = 'User role information not found.'
      }
    }
  } catch (err) {
    console.log(err)
    error.value = 'Sign in failed. Please check your credentials.'
  }
}
</script>

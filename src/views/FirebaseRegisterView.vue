<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <select v-model="role">
      <option value="" disabled>Select Role</option>
      <option value="teacher">Teacher</option>
      <option value="student">student</option>
      <option value="guest">guest</option>
    </select>
  </p>
  <p><button @click="register">Save to Firebase</button></p>
  <p v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
const email = ref('')
const password = ref('')
const role = ref('')
const error = ref('')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const register = async () => {
  // Basic role validation
  if (!role.value) {
    error.value = 'Please select a role.'
    return
  }

  try {
    // Register user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Register Successful!')

    // Get the user object
    const user = userCredential.user

    // Save the user role to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role.value
    })

    console.log('User role saved to Firestore successfully!')

    // Redirect to login or another page
    router.push('/firelogin')
  } catch (err) {
    console.log(err.code)
    error.value = 'Registration failed. Please check your inputs.'
  }
}
</script>

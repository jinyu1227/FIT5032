<template>
  <div>
    <h1>Log Out</h1>
    <p>User Email: {{ userEmail }}</p>
    <p>User Role: {{ userRole }}</p>
    <button @click="logout">Log out</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()

const userEmail = ref(localStorage.getItem('userEmail') || 'No user logged in')
const userRole = ref(localStorage.getItem('userRole') || 'No role assigned')

onMounted(() => {
  console.log(`Current User: ${userEmail.value}, Role: ${userRole.value}`)
})

const logout = () => {
  console.log(`Logging out User: ${userEmail.value}, Role: ${userRole.value}`)

  signOut(auth)
    .then(() => {
      console.log('User signed out successfully!')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userEmail')
      router.push('/firelogin')
    })
    .catch((error) => {
      console.log(`Error signing out: ${error}`)
    })
}
</script>

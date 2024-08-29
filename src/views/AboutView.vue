<template>
  <div class="about">
    <h1>About Our Library</h1>
    <p>
      Welcome to our digital library! We're dedicated to providing a vast collection of books and
      resources to our community.
    </p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>

<style></style>

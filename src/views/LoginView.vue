<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <form @submit.prevent="login">
          <div class="row mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="formData.username" />
          </div>
          <div class="row mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="formData.password" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
        <div v-if="error" class="text-danger">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const formData = ref({
  username: '',
  password: ''
})
const error = ref(null)
const router = useRouter()
const login = () => {
  if (formData.value.username === 'user' && formData.value.password === 'qwe123') {
    localStorage.setItem('isAuthenticated', true)
    router.push('/about')
  } else {
    error.value = 'Invalid username or password.'
  }
}
const clearForm = () => {
  formData.value.username = ''
  formData.value.password = ''
  error.value = null
}
</script>

<style></style>

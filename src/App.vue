<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>

    <main class="main-box">
      <!-- <LibraryRegistrationForm /> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BHeader from './components/BHeader.vue'
//import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue'
import CountBookAPI from './views/CountBookAPI.vue'
//const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
//const router = useRouter()

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI'
    }
  }
}
// const logout = () => {
//   localStorage.removeItem('isAuthenticated')
//   isAuthenticated.value = false
//   router.push('/login')
// }
</script>

<style>
.container,
.about {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}

.green-message {
  color: green;
}
</style>

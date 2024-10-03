<template>
  <div>
    <h1>All Books</h1>
    <pre>{{ JSON.stringify(books, null, 2) }}</pre>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BookList',
  data() {
    return {
      books: null
    }
  },
  mounted() {
    this.getAllBookAPI()
  },
  methods: {
    async getAllBookAPI() {
      try {
        const response = await axios.get('https://getallbooks-ev2gykg43q-uc.a.run.app')
        this.books = response.data.books
      } catch (error) {
        console.error('Error fetching book data:', error)
      }
    }
  }
}
</script>

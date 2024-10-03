<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    <BookList />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import BookList from '../components/BookList.vue'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')
    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        const response = await axios.post('https://addbook-ev2gykg43q-uc.a.run.app', {
          isbn: isbnNumber,
          name: name.value
        })

        if (response.status === 200) {
          isbn.value = ''
          name.value = ''
          alert('Book added successfully with capitalized name!')
        }
      } catch (error) {
        console.error('Error adding book: ', error)
        alert('Failed to add book')
      }
    }
    return {
      isbn,
      name,
      addBook
    }
  },
  components: {
    BookList
  }
}
</script>

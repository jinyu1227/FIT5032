<template>
  <div>
    <h1>Books with ISBN > 1000, Ordered by Name, Limited to 3</h1>
    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id">
        <div>{{ book.name }} - ISBN: {{ book.isbn }}</div>
        <button @click="editBook(book.id, book.name, book.isbn)">Edit</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
    <p v-else>No books found with ISBN greater than 1000.</p>

    <!-- Edit Form -->
    <div v-if="isEditing">
      <h2>Edit Book</h2>
      <form @submit.prevent="updateBook">
        <div>
          <label for="editName">Name:</label>
          <input type="text" v-model="editName" id="editName" />
        </div>
        <div>
          <label for="editIsbn">ISBN:</label>
          <input type="text" v-model="editIsbn" id="editIsbn" />
        </div>
        <button type="submit">Update Book</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const isEditing = ref(false)
    const editBookId = ref(null)
    const editName = ref('')
    const editIsbn = ref('')

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('name', 'asc'),
          limit(3)
        )
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    // Set book to edit mode
    const editBook = (id, name, isbn) => {
      isEditing.value = true
      editBookId.value = id
      editName.value = name
      editIsbn.value = isbn
    }

    // Update the book in Firestore
    const updateBook = async () => {
      try {
        const bookDocRef = doc(db, 'books', editBookId.value)
        await updateDoc(bookDocRef, {
          name: editName.value,
          isbn: Number(editIsbn.value) // Ensure ISBN is a number
        })
        alert('Book updated successfully!')
        isEditing.value = false
        fetchBooks() // Refresh the list after updating
      } catch (error) {
        console.error('Error updating book:', error)
      }
    }

    // Delete the book from Firestore
    const deleteBook = async (id) => {
      try {
        const bookDocRef = doc(db, 'books', id)
        await deleteDoc(bookDocRef)
        alert('Book deleted successfully!')
        fetchBooks() // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    }

    // Cancel edit mode
    const cancelEdit = () => {
      isEditing.value = false
      editBookId.value = null
      editName.value = ''
      editIsbn.value = ''
    }

    onMounted(fetchBooks)

    return {
      books,
      isEditing,
      editName,
      editIsbn,
      editBook,
      updateBook,
      deleteBook,
      cancelEdit
    }
  }
}
</script>

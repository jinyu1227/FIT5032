const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books: ", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.addBook = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const {isbn, name} = req.body;

      if (!isbn || !name) {
        res.status(400).send("ISBN and name are required");
        return;
      }

      const newBook = {
        isbn: isbn,
        name: name.toUpperCase(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const bookRef = await admin.firestore().collection("books").add(newBook);

      res.status(200).send({
        message: "Book added successfully!",
        id: bookRef.id,
      });
    } catch (error) {
      console.error("Error adding book:", error);
      res.status(500).send({
        message: "Failed to add book",
        error: error.message,
      });
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      const books = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));

      res.status(200).send({books});
    } catch (error) {
      console.error("Error fetching books: ", error.message);
      res.status(500).send("Error fetching books");
    }
  });
});

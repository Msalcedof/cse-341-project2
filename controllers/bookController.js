const Book = require('../models/book');

//GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//POST create a new book with validation
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear, pages, rating, summary } = req.body;

    //Validation
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required and must be a string' });
    }
    if (publishedYear && typeof publishedYear !== 'number') {
      return res.status(400).json({ error: 'Published year must be a number' });
    }
    if (rating && typeof rating !== 'number') {
      return res.status(400).json({ error: 'Rating must be a number' });
    }

    const newBook = new Book({ title, author, genre, publishedYear, pages, rating, summary });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

//PUT update a book with validation and error handling
exports.updateBook = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Update data is required' });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//DELETE a book with error handling
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

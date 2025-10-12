const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  publishedYear: Number,
  pages: Number,
  rating: Number,
  summary: String
});

module.exports = mongoose.model('Books', bookSchema);

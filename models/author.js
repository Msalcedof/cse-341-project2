const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
  nationality: { type: String }
});

module.exports = mongoose.model('Author', authorSchema, 'authors');

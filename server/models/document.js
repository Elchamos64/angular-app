const mongoose = require('mongoose');

const childSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  children: [childSchema] // Embedded documents, not refs

});

module.exports = mongoose.model('Document', documentSchema);

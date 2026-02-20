const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
  query: { type: String, required: true, unique: true },
  data: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Knowledge', knowledgeSchema);
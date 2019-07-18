const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Url", UrlSchema);
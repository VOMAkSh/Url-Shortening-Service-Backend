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
  },
  name: {
    type: String,
  },
  description: {
    type: String
  },
  expiration: {
    type: Number,
    validate : {
      validator : Number.isInteger,
      message : 'Expiration Time should be epoch time in miliseconds'
    }
  }
});

module.exports = mongoose.model("Url", UrlSchema);
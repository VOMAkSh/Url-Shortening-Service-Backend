const mongoose = require('mongoose');

const UrlsGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  urls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url'
  }]
});

module.exports = mongoose.model('UrlsGroup', UrlsGroupSchema)
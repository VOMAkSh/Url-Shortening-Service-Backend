const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picUrl: {
    type: String,
    default: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'
  },
  urls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url'
  }]
});

module.exports = mongoose.model('User', UserSchema);


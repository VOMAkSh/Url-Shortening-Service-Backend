const mongoose = require('mongoose');
const { mongodb } = require('./config');

const connectDb = async () => {
  try {
    await mongoose.connect(mongodb.url, { useNewUrlParser: true, useFindAndModify: false });
    console.log("Connected to MongoDb database successfully!")
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDb;
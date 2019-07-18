const validUrl = require('valid-url');
const shortid = require('shortid');
const { baseUrl } = require('../../config/config');
const Url = require('../../models/Url');

const checkValidUrl = url => {
  return validUrl.isUri(url);
}

const generateUrlCode = () => {
  const generatedCode = shortid.generate();
  return {
    shortUrl: baseUrl + generatedCode,
    shortCode: generatedCode
  }
}

const checkIfSameUrlExistsForUser = async (url, userId) => {
  try {
    const urlExists = await Url.findOne({ originalUrl: url, userId });
    if (urlExists) {
      return urlExists;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  checkValidUrl,
  generateUrlCode,
  checkIfSameUrlExistsForUser
}
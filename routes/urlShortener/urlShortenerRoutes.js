const Router = require('express').Router();
const Url = require('../../models/Url');
const User = require("../../models/User");
const { checkValidUrl, generateUrlCode, checkIfSameUrlExistsForUser } = require('../../helpers/url/urlHelper');
const passport = require('passport');
require('../../config/passport');

Router.post("/add", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.user;
    if (!checkValidUrl(url)) {
      return res.status(401).json({
        error: 'Not a valid Url'
      });
    }
    let urlExists = await checkIfSameUrlExistsForUser(url, userId);
    if (urlExists) {
      return res.status(200).json({
        shortUrl: urlExists.shortUrl,
        originalUrl: urlExists.originalUrl
      });
    }
    const { shortUrl, shortCode } = generateUrlCode(url);
    const newUrl = new Url({
      originalUrl: url,
      shortCode,
      shortUrl,
      userId
    });
    await newUrl.save();
    try {
      await User.findOneAndUpdate({ _id: userId }, { $push: { urls: newUrl._id } });
    } catch (error) {
      return res.status(401).json({
        error
      })
    }
    res.status(200).json({
      shortUrl,
      originalUrl: url
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error
    });
  }
});

module.exports = Router;
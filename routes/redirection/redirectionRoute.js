const Router = require('express').Router();
const Url = require('../../models/Url');

Router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const urlExists = await Url.findOne({ shortCode });
    if (!urlExists) {
      return res.status(404).json({
        error: "Invalid url"
      });
    }
    if (urlExists.expiration) {
      const currentEpochTime = new Date().getTime();
      const expirationTime = parseInt(urlExists.expiration);
      if (currentEpochTime < expirationTime) {
        return res.redirect(urlExists.originalUrl);
      }
      return res.status(400).json({
        error: "The shortened url link has been expired"
      });
    }
    return res.redirect(urlExists.originalUrl);
  } catch (error) {
    res.status(500).json({
      error
    });
  }
});

module.exports = Router;
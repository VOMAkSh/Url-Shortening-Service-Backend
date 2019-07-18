const Router = require('express').Router();
const User = require('../../models/User');
const { createHashPassword, createJwtToken } = require('../../helpers/auth/authHelper');
const passport = require('passport');
require('../../config/passport');

Router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(401).json({
        error: "User already exists"
      });
    }
    const hashedPassword = await createHashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({
        error: "Something went wrong!"
      });
    }
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    res.status(200).json({
      error: null,
      user: {
        email: newUser.email,
        name: newUser.name,
        id: newUser._id
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error
    });
  }
});

Router.post("/login", 
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    try {
      const user  = req.user;
      if (!user) {
        return res.status(401).json({
          user: null,
          error: "Invalid User or Password"
        });
      }
      const token = createJwtToken(user._id);
      res.status(200).json({
        user: {
          email: user.email,
          name: user.name,
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        error
      })
    }
  }
);

module.exports = Router;
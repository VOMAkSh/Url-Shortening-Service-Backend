const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { passportConfig } = require('./config');

// Simple email and password based authentication
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return done("Invalid password");
      } 
      return done(null, user);
    }
    done("Invalid User");
  } catch (error) {
    console.error(error);
  }
}));

// JWT Token Authentication for protected routes
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: passportConfig.secretOrKey
}, async (payload, done) => {
  try {
    const { userId } = payload;
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) {
      return done("Invalid Token");
    }
    return done(null, userId);
  } catch (error) {
    return done(error);
  }
}));
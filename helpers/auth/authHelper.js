const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { passportConfig } = require('../../config/config');

const createHashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    return null;
  }
}

const createJwtToken = userId => {
  return jwt.sign({ userId }, passportConfig.secretOrKey, { expiresIn: 60 * 60 * 72 });
}

module.exports = {
  createHashPassword,
  createJwtToken
}
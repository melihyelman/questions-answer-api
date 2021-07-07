const { request } = require("express");

const bcrypt = require("bcryptjs");
const validateUserInput = (email, password) => {
  return email && password;
};

const compairePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  validateUserInput,
  compairePassword,
};

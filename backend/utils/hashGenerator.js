const bcrypt = require("bcrypt");

module.exports.hashMaker = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error('Hashing failed: ', err);
  }
};

module.exports.hashChecker = async (hashpassword, password) => {
  try {
    return await bcrypt.compare(password, hashpassword);
  } catch (err) {
    throw new Error('Hashing compare failed: ', err);
  }
};

const mongoose = require("mongoose");

const conntedToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("successfully connected to db...😛");
  } catch (err) {
    console.log("connected to db Failed 😐");
    throw new Error(err);
  }
};

module.exports = conntedToDB;

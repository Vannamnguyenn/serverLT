const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  try {
    const connect = await mongoose.connect(process.env.URI_CONNECT_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failuse" + error);
  }
}

module.exports = connect;

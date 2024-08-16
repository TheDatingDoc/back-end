const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/the-dating-doc-backend"
);

module.exports = mongoose.connection;

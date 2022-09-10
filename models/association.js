const mongoose = require("mongoose");

const associationSchema = new mongoose.Schema({
  associationName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Association", associationSchema);

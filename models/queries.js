const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  teamID: {
    type: String,
    required: true,
  },
  queryID: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  queryOpen: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("ClubQueries", querySchema);

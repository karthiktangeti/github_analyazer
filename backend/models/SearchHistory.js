const mongoose = require("mongoose");

const SearchHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  searchedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SearchHistory", SearchHistorySchema);

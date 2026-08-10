const mongoose = require("mongoose");
const SearchHistory = require("../models/SearchHistory");

let fallbackHistory = [];

const normalizeUsername = (value) => (value || "").trim();

exports.saveSearchHistory = async (username) => {
  const normalized = normalizeUsername(username);
  if (!normalized) return;

  try {
    if (mongoose.connection.readyState === 1) {
      await SearchHistory.findOneAndUpdate(
        { username: normalized },
        { $set: { searchedAt: new Date() } },
        { upsert: true, new: true }
      );
      return;
    }
  } catch (error) {
    console.error("MongoDB history save failed", error.message);
  }

  const existingIndex = fallbackHistory.findIndex((entry) => entry.username === normalized);
  if (existingIndex >= 0) {
    fallbackHistory.splice(existingIndex, 1);
  }

  fallbackHistory.unshift({ username: normalized, searchedAt: new Date() });
  fallbackHistory = fallbackHistory.slice(0, 20);
};

exports.getRecentHistory = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const history = await SearchHistory.find().sort({ searchedAt: -1 }).limit(10);
      return res.json({ success: true, history });
    }
  } catch (error) {
    console.error("MongoDB history fetch failed", error.message);
  }

  return res.json({ success: true, history: fallbackHistory });
};

exports.deleteHistoryItem = async (req, res) => {
  const { id } = req.params;

  try {
    if (mongoose.connection.readyState === 1) {
      await SearchHistory.findByIdAndDelete(id);
      return res.json({ success: true, message: "History item deleted" });
    }
  } catch (error) {
    console.error("MongoDB history delete failed", error.message);
  }

  fallbackHistory = fallbackHistory.filter((entry) => entry._id?.toString?.() !== id);
  return res.json({ success: true, message: "History item deleted" });
};

const express = require("express");
const { getRecentHistory, deleteHistoryItem } = require("../controllers/historyController");

const router = express.Router();

router.get("/", getRecentHistory);
router.delete("/:id", deleteHistoryItem);

module.exports = router;

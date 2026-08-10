const express = require("express");
const { getGithubUser } = require("../controllers/githubController");

const router = express.Router();

router.get("/:username", getGithubUser);

module.exports = router;
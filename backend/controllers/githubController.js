const axios = require("axios");
const { saveSearchHistory } = require("./historyController");

const GITHUB_API_BASE = "https://api.github.com";
const DEFAULT_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "github-analyzer-app"
};

const normalizeUsername = (value) => (value || "").trim();
const isValidUsername = (value) => /^[a-zA-Z0-9-]+$/.test(value);

const buildStatistics = (repositories = []) => {
  const safeRepos = repositories.filter(Boolean);

  const totalStars = safeRepos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const totalForks = safeRepos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
  const totalOpenIssues = safeRepos.reduce((sum, repo) => sum + (repo.open_issues_count || 0), 0);

  const originalRepos = safeRepos.filter((repo) => !repo.fork).length;
  const forkedRepos = safeRepos.filter((repo) => repo.fork).length;

  const mostStarredRepo = [...safeRepos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))[0] || null;
  const mostForkedRepo = [...safeRepos].sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0))[0] || null;

  const languages = safeRepos.reduce((acc, repo) => {
    if (!repo.language) return acc;
    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});

  return {
    totalRepositories: safeRepos.length,
    totalStars,
    totalForks,
    totalOpenIssues,
    originalRepos,
    forkedRepos,
    mostStarredRepo: mostStarredRepo ? { name: mostStarredRepo.name, stars: mostStarredRepo.stargazers_count } : null,
    mostForkedRepo: mostForkedRepo ? { name: mostForkedRepo.name, forks: mostForkedRepo.forks_count } : null,
    languages
  };
};

exports.getGithubUser = async (req, res) => {
  const username = normalizeUsername(req.params.username);

  if (!username) {
    return res.status(400).json({ success: false, message: "GitHub username is required" });
  }

  if (!isValidUsername(username)) {
    return res.status(400).json({ success: false, message: "Please enter a valid GitHub username." });
  }

  try {
    const [profileResponse, reposResponse] = await Promise.all([
      axios.get(`${GITHUB_API_BASE}/users/${username}`, { headers: DEFAULT_HEADERS }),
      axios.get(`${GITHUB_API_BASE}/users/${username}/repos`, {
        params: { per_page: 100, page: 1, sort: "updated", direction: "desc" },
        headers: DEFAULT_HEADERS
      })
    ]);

    const profile = profileResponse.data;
    const repositories = reposResponse.data;
    const statistics = buildStatistics(repositories);

    await saveSearchHistory(username);

    return res.json({
      success: true,
      profile,
      repositories,
      statistics
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ success: false, message: "GitHub user not found" });
    }

    if (error.response?.status === 403) {
      return res.status(429).json({ success: false, message: "GitHub API rate limit exceeded. Please try again later." });
    }

    if (error.code === "ERR_NETWORK") {
      return res.status(503).json({ success: false, message: "Please check your internet connection and try again." });
    }

    return res.status(500).json({ success: false, message: "Something went wrong while fetching GitHub data." });
  }
};
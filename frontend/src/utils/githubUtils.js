export const formatNumber = (value) => new Intl.NumberFormat().format(value || 0);

export const calculateRepositoryStats = (repositories = []) => {
  const safeRepos = repositories.filter(Boolean);

  const totalStars = safeRepos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const totalForks = safeRepos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
  const totalOpenIssues = safeRepos.reduce((sum, repo) => sum + (repo.open_issues_count || 0), 0);
  const originalRepos = safeRepos.filter((repo) => !repo.fork).length;
  const forkedRepos = safeRepos.filter((repo) => repo.fork).length;

  const mostStarredRepo = [...safeRepos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))[0] || null;
  const mostForkedRepo = [...safeRepos].sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0))[0] || null;

  const languageCounts = safeRepos.reduce((acc, repo) => {
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
    mostStarredRepo,
    mostForkedRepo,
    languageCounts
  };
};

export const sortRepositories = (repositories = [], sortBy) => {
  const list = [...repositories];

  switch (sortBy) {
    case 'most-stars':
      return list.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    case 'most-forks':
      return list.sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0));
    case 'recently-updated':
      return list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list;
  }
};

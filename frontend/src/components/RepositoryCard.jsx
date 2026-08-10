import { ExternalLink, Star, GitFork, AlertCircle, Clock3 } from 'lucide-react';
import { formatNumber } from '../utils/githubUtils';

function RepositoryCard({ repo }) {
  const updatedAt = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'Unknown';

  return (
    <article className="card repository-card">
      <div className="repo-header">
        <h3>{repo.name}</h3>
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="icon-link">
          <ExternalLink size={16} />
        </a>
      </div>
      <p className="repo-description">{repo.description || 'No description provided.'}</p>
      <div className="badge-row">
        {repo.language && <span className="badge">{repo.language}</span>}
        {repo.fork && <span className="badge badge-muted">Fork</span>}
      </div>
      <div className="repo-meta">
        <span><Star size={14} /> {formatNumber(repo.stargazers_count)}</span>
        <span><GitFork size={14} /> {formatNumber(repo.forks_count)}</span>
        <span><AlertCircle size={14} /> {formatNumber(repo.open_issues_count)}</span>
      </div>
      <p className="repo-updated"><Clock3 size={14} /> Updated {updatedAt}</p>
    </article>
  );
}

export default RepositoryCard;

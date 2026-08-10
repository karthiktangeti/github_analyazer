import { useMemo, useState } from 'react';
import RepositoryCard from './RepositoryCard';
import { sortRepositories } from '../utils/githubUtils';

function RepositoryList({ repositories }) {
  const [sortBy, setSortBy] = useState('most-stars');

  const sortedRepos = useMemo(() => sortRepositories(repositories, sortBy), [repositories, sortBy]);

  return (
    <section className="card">
      <div className="section-heading">
        <h3>Repositories</h3>
        <label className="sort-control">
          <span>Sort by</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="most-stars">Most Stars</option>
            <option value="most-forks">Most Forks</option>
            <option value="recently-updated">Recently Updated</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <div className="repository-list">
        {sortedRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}

export default RepositoryList;

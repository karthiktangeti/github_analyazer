import { BookOpen, Users, GitBranch, FileCode2 } from 'lucide-react';
import { formatNumber } from '../utils/githubUtils';

function StatsCards({ profile }) {
  const stats = [
    { label: 'Public Repositories', value: profile.public_repos, icon: <BookOpen size={20} /> },
    { label: 'Followers', value: profile.followers, icon: <Users size={20} /> },
    { label: 'Following', value: profile.following, icon: <Users size={20} /> },
    { label: 'Public Gists', value: profile.public_gists, icon: <FileCode2 size={20} /> }
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article key={stat.label} className="card stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div>
            <p className="stat-label">{stat.label}</p>
            <h3>{formatNumber(stat.value)}</h3>
          </div>
        </article>
      ))}
    </section>
  );
}

export default StatsCards;

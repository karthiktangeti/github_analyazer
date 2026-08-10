import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import StatsCards from '../components/StatsCards';
import LanguageChart from '../components/LanguageChart';
import RepositoryList from '../components/RepositoryList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import API from '../services/api';
import { calculateRepositoryStats, formatNumber } from '../utils/githubUtils';

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await API.get(`/github/${username}`);
      const payload = response.data || {};

      if (payload.success === false) {
        throw new Error(payload.message || 'Unable to load profile');
      }

      const normalizedData = {
        success: true,
        profile: payload.profile || payload.user || null,
        repositories: payload.repositories || payload.repos || [],
        statistics: payload.statistics || {}
      };

      if (!normalizedData.profile) {
        throw new Error('Unable to load profile');
      }

      setProfileData(normalizedData);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
  }, [username]);

  const stats = useMemo(() => calculateRepositoryStats(profileData?.repositories || []), [profileData]);

  if (loading) return <div className="page-shell"><Navbar /><main className="page-content"><Loading /></main></div>;

  if (error) return <div className="page-shell"><Navbar /><main className="page-content"><ErrorMessage message={error} onRetry={fetchProfile} /></main></div>;

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">
        <section className="section-heading profile-topbar">
          <h1>GitHub Profile Analyzer</h1>
          <button className="secondary-btn" onClick={() => navigate('/')}>Analyze another profile</button>
        </section>

        <div className="dashboard-grid">
          <ProfileCard profile={profileData.profile} />
          <StatsCards profile={profileData.profile} />

          <section className="card analytics-card">
            <h3>Repository Analytics</h3>
            <div className="analytics-list">
              <div><span>Total Stars</span><strong>{formatNumber(stats.totalStars)}</strong></div>
              <div><span>Total Forks</span><strong>{formatNumber(stats.totalForks)}</strong></div>
              <div><span>Original Repos</span><strong>{formatNumber(stats.originalRepos)}</strong></div>
              <div><span>Forked Repos</span><strong>{formatNumber(stats.forkedRepos)}</strong></div>
            </div>
          </section>

          <section className="card chart-card">
            <h3>Programming Languages</h3>
            <LanguageChart languageCounts={stats.languageCounts} />
          </section>

          <section className="card top-repo-card">
            <h3>Top Repository</h3>
            {stats.mostStarredRepo ? (
              <>
                <h4>{stats.mostStarredRepo.name}</h4>
                <p>{formatNumber(stats.mostStarredRepo.stars)} stars</p>
              </>
            ) : (
              <p>No repository data available.</p>
            )}
          </section>

          <RepositoryList repositories={profileData.repositories} />
        </div>
      </main>
    </div>
  );
}

export default Profile;

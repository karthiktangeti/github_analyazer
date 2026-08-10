import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import API from '../services/api';

function Home() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await API.get('/history');
        setHistory(response.data.history || []);
      } catch (error) {
        console.error('History load failed', error);
      }
    };

    loadHistory();
  }, []);

  const handleAnalyze = async (username) => {
    setLoading(true);
    try {
      await API.get(`/github/${username}`);
      navigate(`/profile/${username}`);
    } catch (error) {
      navigate(`/profile/${username}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="hero-page">
        <section className="hero-card">
          <p className="eyebrow">Full-stack GitHub analytics</p>
          <h1>Analyze Any GitHub Profile</h1>
          <p className="hero-copy">Get insights into repositories, followers, programming languages, stars, and developer activity.</p>
          <SearchBar onAnalyze={handleAnalyze} loading={loading} />
          <p className="helper-text">Try <button className="text-link" onClick={() => navigate('/profile/octocat')}>octocat</button></p>
        </section>

        <section className="card feature-card" id="about">
          <h2>Why it stands out</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Repository insights</h3>
              <p>Track stars, forks, issues, and recent updates across projects.</p>
            </div>
            <div className="feature-item">
              <h3>Language analysis</h3>
              <p>Discover which languages a developer uses most and visualize them.</p>
            </div>
            <div className="feature-item">
              <h3>Recent searches</h3>
              <p>Jump back into any profile you have analyzed before.</p>
            </div>
          </div>
        </section>

        <section className="card history-card">
          <div className="section-heading">
            <h3>Recent Searches</h3>
          </div>
          {history.length ? (
            <ul className="history-list">
              {history.map((item) => (
                <li key={item._id || item.username}>
                  <button onClick={() => navigate(`/profile/${item.username}`)}>{item.username}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No recent searches yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;

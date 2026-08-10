import { Search } from 'lucide-react';
import { useState } from 'react';

function SearchBar({ onAnalyze, loading }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    onAnalyze(trimmed);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter GitHub username"
        aria-label="GitHub username"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Analyzing...' : <><Search size={16} /> Analyze</>}
      </button>
    </form>
  );
}

export default SearchBar;

import { Home, Info, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <header className="navbar">
      <div className="brand" onClick={() => navigate('/')}>
        <span className="brand-mark">⌘</span>
        <span>GitHub Analyzer</span>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link"><Home size={16} /> Home</Link>
        <a href="#about" className="nav-link"><Info size={16} /> About</a>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;

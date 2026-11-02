import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Github, Menu, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const iconButton = 'inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800';

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const name = query.trim().replace(/^@/, '');
    if (!name) return;
    navigate(`/user/${encodeURIComponent(name)}`);
    setQuery('');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-slate-200 bg-white/90 px-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:px-5">
      <button type="button" onClick={onMenuClick} className={`${iconButton} lg:hidden`} aria-label="Open navigation menu">
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      <Link to="/" className="flex items-center gap-2 font-semibold lg:w-56">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <Code2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline">GitHub Explorer</span>
      </Link>

      <form onSubmit={submit} role="search" className="relative ml-auto hidden max-w-md flex-1 sm:block">
        <label htmlFor="header-search" className="sr-only">Search a GitHub username</label>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input id="header-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Quick search a username"
          autoComplete="off" className="input !min-h-[40px] pl-9" />
      </form>

      <div className="ml-auto flex items-center gap-1 sm:ml-0">
        <Link to="/explore" className={`${iconButton} sm:hidden`} aria-label="Search users"><Search className="h-5 w-5" aria-hidden="true" /></Link>
        <button type="button" onClick={toggleTheme} className={iconButton}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
        </button>
        <a href="https://github.com/Hashirahm11/github-profile-explorer" target="_blank" rel="noopener noreferrer" className={iconButton} aria-label="View this project on GitHub">
          <Github className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

import { useMemo, useState } from 'react';
import { FolderOpen, SearchX } from 'lucide-react';
import useDebounce from '../../hooks/useDebounce.js';
import ErrorState from '../common/ErrorState.jsx';
import StateMessage from '../common/StateMessage.jsx';
import RepoCard from './RepoCard.jsx';

const SORTS = {
  updated: { label: 'Recently updated', fn: (a, b) => new Date(b.updated_at) - new Date(a.updated_at) },
  stars: { label: 'Most stars', fn: (a, b) => b.stargazers_count - a.stargazers_count },
  forks: { label: 'Most forks', fn: (a, b) => b.forks_count - a.forks_count },
  name: { label: 'Repository name', fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function RepoExplorer({ repos, error, onRetry }) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('all');
  const [sort, setSort] = useState('updated');
  const [includeForks, setIncludeForks] = useState(false);
  const [includeArchived, setIncludeArchived] = useState(false);
  const search = useDebounce(query, 250);

  const languages = useMemo(() => [...new Set(repos.map((r) => r.language).filter(Boolean))].sort(), [repos]);

  const results = useMemo(() => {
    const term = search.trim().toLowerCase();
    return repos
      .filter((r) =>
        (!term || r.name.toLowerCase().includes(term)) &&
        (language === 'all' || r.language === language) &&
        (includeForks || !r.fork) &&
        (includeArchived || !r.archived)
      )
      .sort(SORTS[sort].fn);
  }, [repos, search, language, sort, includeForks, includeArchived]);

  const filtersActive = Boolean(query.trim()) || language !== 'all' || sort !== 'updated' || includeForks || includeArchived;
  const clearFilters = () => {
    setQuery('');
    setLanguage('all');
    setSort('updated');
    setIncludeForks(false);
    setIncludeArchived(false);
  };

  return (
    <section id="repositories" aria-labelledby="repos-heading" className="scroll-mt-24">
      <h2 id="repos-heading" className="mb-3 text-lg font-semibold">Repositories <span className="muted text-sm font-normal">({repos.length} fetched)</span></h2>

      {error ? <ErrorState error={error} onRetry={onRetry} /> : repos.length === 0 ? (
        <StateMessage icon={FolderOpen} title="No public repositories">This user has not published any public repositories yet.</StateMessage>
      ) : (
        <>
          <div className="card mb-4 grid gap-3 p-4 sm:grid-cols-3">
            <div>
              <label htmlFor="repo-search" className="muted mb-1 block text-xs font-medium">Search by name</label>
              <input id="repo-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter repositories..." className="input" />
            </div>
            <div>
              <label htmlFor="repo-language" className="muted mb-1 block text-xs font-medium">Language</label>
              <select id="repo-language" value={language} onChange={(e) => setLanguage(e.target.value)} className="input">
                <option value="all">All languages</option>
                {languages.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="repo-sort" className="muted mb-1 block text-xs font-medium">Sort by</label>
              <select id="repo-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="input">
                {Object.entries(SORTS).map(([key, s]) => <option key={key} value={key}>{s.label}</option>)}
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-3 dark:border-slate-800 sm:col-span-3">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={includeForks} onChange={(e) => setIncludeForks(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900" />
                Include forks
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={includeArchived} onChange={(e) => setIncludeArchived(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900" />
                Include archived
              </label>
              {filtersActive && (
                <button type="button" onClick={clearFilters} className="ml-auto text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200">
                  Reset filters
                </button>
              )}
            </div>
          </div>

          <p className="muted mb-3 text-sm" aria-live="polite">Showing {results.length} of {repos.length} repositories</p>
          {results.length === 0 ? (
            <StateMessage icon={SearchX} title="No matching repositories"
              action={<button type="button" onClick={clearFilters} className="btn-primary">Clear filters</button>}>
              Try a different name or choose another language.
            </StateMessage>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">{results.map((r) => <RepoCard key={r.id ?? r.name} repo={r} />)}</div>
          )}
        </>
      )}
    </section>
  );
}

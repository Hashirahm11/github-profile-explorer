import { CircleDot, ExternalLink, GitFork, Lock, Globe2, Star } from 'lucide-react';
import { formatNumber, timeAgo } from '../../utils/format.js';
import { languageColor } from '../../utils/languages.js';

export default function RepoCard({ repo }) {
  const visibility = repo.visibility || (repo.private ? 'private' : 'public');
  const VisIcon = visibility === 'public' ? Globe2 : Lock;
  return (
    <article className="card flex flex-col p-4 transition-colors hover:border-indigo-300 dark:hover:border-indigo-500/60">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 break-words font-semibold">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-300">{repo.name}</a>
        </h3>
        <span className="muted inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-xs capitalize dark:border-slate-700">
          <VisIcon className="h-3 w-3" aria-hidden="true" />{visibility}
        </span>
      </div>
      <p className={`mt-2 line-clamp-2 flex-1 text-sm ${repo.description ? 'muted' : 'muted italic'}`}>{repo.description || 'No description provided.'}</p>
      <dl className="muted mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Language</dt>
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repo.language ? languageColor(repo.language) : '#94a3b8' }} aria-hidden="true" />
          <dd>{repo.language || 'No language'}</dd>
        </div>
        <div className="flex items-center gap-1"><dt className="sr-only">Stars</dt><Star className="h-3.5 w-3.5" aria-hidden="true" /><dd>{formatNumber(repo.stargazers_count)}</dd></div>
        <div className="flex items-center gap-1"><dt className="sr-only">Forks</dt><GitFork className="h-3.5 w-3.5" aria-hidden="true" /><dd>{formatNumber(repo.forks_count)}</dd></div>
        <div className="flex items-center gap-1"><dt className="sr-only">Open issues</dt><CircleDot className="h-3.5 w-3.5" aria-hidden="true" /><dd>{formatNumber(repo.open_issues_count)}</dd></div>
      </dl>
      <div className="muted mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
        <span>Updated {timeAgo(repo.updated_at)}</span>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-indigo-600" aria-label={`Open ${repo.name} on GitHub`}>
          GitHub <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

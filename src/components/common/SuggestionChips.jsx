import { Link } from 'react-router-dom';

export const SUGGESTED_USERS = ['torvalds', 'gaearon', 'sindresorhus', 'yyx990803'];

export default function SuggestionChips({ basePath = '/user' }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="muted text-sm">Try:</span>
      {SUGGESTED_USERS.map((name) => (
        <Link key={name} to={`${basePath}/${name}`}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-300">
          {name}
        </Link>
      ))}
    </div>
  );
}

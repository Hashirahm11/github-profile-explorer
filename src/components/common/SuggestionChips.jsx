import { Link } from 'react-router-dom';

export const SUGGESTED_USERS = ['torvalds', 'gaearon', 'sindresorhus', 'yyx990803'];

export default function SuggestionChips({ basePath = '/user' }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="muted text-sm">Try:</span>
      {SUGGESTED_USERS.map((name) => (
        <Link key={name} to={`${basePath}/${name}`}
          className="text-sm font-medium text-indigo-600 transition-colors hover:underline dark:text-indigo-300">
          {name}
        </Link>
      ))}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// Compact avatar + username card used by Favorites and Recently viewed.
export default function UserCard({ profile, onRemove }) {
  return (
    <div className="card group relative flex items-center gap-3 p-3 transition-colors hover:border-indigo-300 dark:hover:border-indigo-500/60">
      <Link to={`/user/${profile.login}`} className="flex min-w-0 flex-1 items-center gap-3">
        <img src={profile.avatar_url} alt={`${profile.login} avatar`} loading="lazy" width="40" height="40"
          className="h-10 w-10 shrink-0 rounded-full bg-slate-200 object-cover dark:bg-slate-800" />
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">{profile.name || profile.login}</span>
          <span className="muted block truncate text-xs">@{profile.login}</span>
        </span>
      </Link>
      {onRemove && (
        <button type="button" onClick={() => onRemove(profile)} aria-label={`Remove ${profile.login} from favorites`}
          className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

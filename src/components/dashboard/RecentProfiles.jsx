import { History, Trash2 } from 'lucide-react';
import { useProfiles } from '../../context/FavoritesContext.jsx';
import UserCard from './UserCard.jsx';

export default function RecentProfiles() {
  const { recent, clearRecent } = useProfiles();
  return (
    <section aria-labelledby="recent-heading">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="recent-heading" className="text-lg font-semibold">Recently viewed</h2>
        {recent.length > 0 && (
          <button type="button" onClick={clearRecent} className="muted inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm hover:text-red-600">
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Clear history
          </button>
        )}
      </div>
      {recent.length === 0 ? (
        <div className="card flex items-center gap-3 p-5">
          <History className="h-5 w-5 shrink-0 text-indigo-500" aria-hidden="true" />
          <p className="muted text-sm">No profiles viewed yet. Profiles you open will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {recent.map((p) => <UserCard key={p.login} profile={p} />)}
        </div>
      )}
    </section>
  );
}

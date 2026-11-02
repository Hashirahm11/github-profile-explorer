import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useProfiles } from '../context/FavoritesContext.jsx';
import PageHeader from '../components/common/PageHeader.jsx';
import StateMessage from '../components/common/StateMessage.jsx';
import UserCard from '../components/dashboard/UserCard.jsx';

export default function Favorites() {
  const { favorites, toggleFavorite } = useProfiles();
  return (
    <div>
      <PageHeader title="Favorites" description="Profiles you saved. They are stored in this browser only." />
      {favorites.length === 0 ? (
        <StateMessage icon={Heart} title="No favorite profiles yet"
          action={<Link to="/explore" className="btn-primary">Find profiles</Link>}>
          Open any profile and choose Add to Favorites to keep it here.
        </StateMessage>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((p) => <UserCard key={p.login} profile={p} onRemove={toggleFavorite} />)}
        </div>
      )}
    </div>
  );
}

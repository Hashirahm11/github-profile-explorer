import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGitHubProfile from '../hooks/useGitHubProfile.js';
import { useProfiles } from '../context/FavoritesContext.jsx';
import { ProfileSkeleton } from '../components/common/Skeletons.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import ProfileCard from '../components/profile/ProfileCard.jsx';
import StatsSection from '../components/profile/StatsSection.jsx';
import RepoExplorer from '../components/repositories/RepoExplorer.jsx';

export default function Profile() {
  const { username } = useParams();
  const { status, user, repos, error, reposError, retry } = useGitHubProfile(username);
  const { addRecent } = useProfiles();

  useEffect(() => { if (user) addRecent(user); }, [user, addRecent]);
  useEffect(() => { document.title = user ? `${user.login} · GitHub Explorer` : 'GitHub Explorer'; }, [user]);

  if (status === 'loading' || status === 'idle') return <ProfileSkeleton />;
  if (status === 'error') return <ErrorState error={error} username={username} onRetry={retry} />;

  return (
    <div className="space-y-8">
      <ProfileCard user={user} onViewRepos={() => document.getElementById('repositories')?.scrollIntoView({ behavior: 'smooth' })} />
      <StatsSection user={user} repos={repos} />
      <RepoExplorer repos={repos} error={reposError} onRetry={retry} />
    </div>
  );
}

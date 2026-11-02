import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useGitHubProfile from '../hooks/useGitHubProfile.js';
import PageHeader from '../components/common/PageHeader.jsx';
import SearchForm from '../components/common/SearchForm.jsx';
import SuggestionChips from '../components/common/SuggestionChips.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import { RepoSkeletons } from '../components/common/Skeletons.jsx';
import RepoExplorer from '../components/repositories/RepoExplorer.jsx';

export default function RepositoryExplorer() {
  const { username } = useParams();
  const { status, user, repos, error, reposError, retry } = useGitHubProfile(username);

  return (
    <div className="space-y-6">
      <PageHeader title="Repository Explorer" description="Enter a username to search, filter and sort their public repositories." />
      <div className="card space-y-4 p-6">
        <SearchForm basePath="/repositories" placeholder="Enter a username to list repositories" buttonLabel="Find repositories" />
        <SuggestionChips basePath="/repositories" />
      </div>

      {username && (status === 'loading' || status === 'idle') && <RepoSkeletons />}
      {username && status === 'error' && <ErrorState error={error} username={username} onRetry={retry} />}
      {username && status === 'success' && (
        <>
          <Link to={`/user/${user.login}`} className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:underline dark:text-indigo-300">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to {user.login}'s profile
          </Link>
          <RepoExplorer repos={repos} error={reposError} onRetry={retry} />
        </>
      )}
    </div>
  );
}

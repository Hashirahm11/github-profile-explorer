import PageHeader from '../components/common/PageHeader.jsx';
import SearchForm from '../components/common/SearchForm.jsx';
import SuggestionChips from '../components/common/SuggestionChips.jsx';
import RecentProfiles from '../components/dashboard/RecentProfiles.jsx';

export default function Explore() {
  return (
    <div className="space-y-8">
      <PageHeader title="Explore Users" description="Search any public GitHub username to view their profile, repositories and statistics." />
      <div className="card space-y-4 p-6">
        <SearchForm />
        <SuggestionChips />
      </div>
      <RecentProfiles />
    </div>
  );
}

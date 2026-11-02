import { Link } from 'react-router-dom';
import { BarChart3, Database, FolderGit2, Heart, Search } from 'lucide-react';
import SearchForm from '../components/common/SearchForm.jsx';
import SuggestionChips from '../components/common/SuggestionChips.jsx';
import RecentProfiles from '../components/dashboard/RecentProfiles.jsx';

const features = [
  { icon: Search, title: 'Search any profile', text: 'Look up any public GitHub username and see their profile details instantly.' },
  { icon: FolderGit2, title: 'Explore repositories', text: 'Search, filter by language and sort repositories by stars, forks or activity.' },
  { icon: BarChart3, title: 'View statistics', text: 'See stars and language usage calculated from the fetched public repositories.' },
  { icon: Heart, title: 'Save favorites', text: 'Keep the profiles you care about, saved in your browser for next time.' },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="card p-6 sm:p-10">
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Welcome to GitHub Explorer</h1>
        <p className="muted mt-3 max-w-2xl">
          Explore public GitHub profiles, browse their repositories and see language and star statistics in one clean dashboard. No sign-in required.
        </p>
        <div className="mt-6 max-w-2xl space-y-4">
          <SearchForm />
          <SuggestionChips />
        </div>
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="mb-3 text-lg font-semibold">What you can do</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-medium">{title}</h3>
              <p className="muted mt-1 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <RecentProfiles />

      <section className="card flex gap-4 p-5" aria-labelledby="api-heading">
        <Database className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" aria-hidden="true" />
        <div>
          <h2 id="api-heading" className="font-medium">About the data</h2>
          <p className="muted mt-1 text-sm">
            All data comes live from the public GitHub REST API (api.github.com) without authentication. Unauthenticated requests are limited to 60 per hour per IP address,
            so results are cached for a few minutes. <Link to="/about" className="text-indigo-600 hover:underline dark:text-indigo-300">Learn more</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

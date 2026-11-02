import { Link } from 'react-router-dom';
import {
  Archive,
  BarChart3,
  Database,
  FolderGit2,
  GitFork,
  Heart,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import SearchForm from '../components/common/SearchForm.jsx';
import SuggestionChips from '../components/common/SuggestionChips.jsx';
import RecentProfiles from '../components/dashboard/RecentProfiles.jsx';

const features = [
  {
    icon: Users,
    title: 'Understand the people',
    text: 'Get the context behind a profile, from their bio and community to the work they share.',
  },
  {
    icon: FolderGit2,
    title: 'Find the right projects',
    text: 'Search repositories, narrow by language, and sort by recent activity, stars, or forks.',
  },
  {
    icon: BarChart3,
    title: 'See the bigger picture',
    text: 'Explore repository activity, star counts, and a snapshot of languages used.',
  },
  {
    icon: Heart,
    title: 'Keep your shortlist',
    text: 'Save interesting profiles and return to them later. Your lists stay in this browser.',
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="hero-panel relative isolate overflow-hidden rounded-[2rem] p-6 text-white shadow-2xl shadow-indigo-950/15 sm:p-10 lg:p-12">
        <div className="hero-glow pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-36 left-1/3 -z-10 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-medium tracking-wide text-indigo-100">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              A clearer view of GitHub
            </div>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Meet the people
              <br className="hidden sm:block" /> behind the <span className="hero-heading-accent">code.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-indigo-100/80 sm:text-lg">
              Explore public profiles, find standout repositories, and understand a developer’s work—all in one focused workspace.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/25 p-3 shadow-lg shadow-slate-950/10 backdrop-blur-sm sm:p-4">
              <SearchForm placeholder="Try a GitHub username" buttonLabel="Explore profile" />
              <div className="mt-3 [&_span]:text-indigo-100/70 [&_a]:border-white/15 [&_a]:bg-white/[0.07] [&_a]:text-white [&_a:hover]:border-indigo-200/50 [&_a:hover]:bg-white/10 [&_a:hover]:text-white">
                <SuggestionChips />
              </div>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-indigo-100/65">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Public GitHub data only. No account or sign-in required.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm lg:ml-auto lg:mr-0">
            <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold">Your research, at a glance</p>
                  <p className="mt-1 text-xs text-indigo-100/60">A focused toolkit for exploring GitHub</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/15 text-indigo-100">
                  <Search className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-5">
                <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                  <p className="text-2xl font-semibold tracking-tight">100</p>
                  <p className="mt-1 text-xs text-indigo-100/65">Recent repos per profile</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
                  <p className="text-2xl font-semibold tracking-tight">5 min</p>
                  <p className="mt-1 text-xs text-indigo-100/65">Short-lived response cache</p>
                </div>
              </div>
              <ul className="space-y-3 border-t border-white/10 pt-4 text-sm text-indigo-50/85">
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08]"><GitFork className="h-4 w-4" aria-hidden="true" /></span>
                  Filter projects to match your search
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08]"><Archive className="h-4 w-4" aria-hidden="true" /></span>
                  Compare activity and language mix
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08]"><Heart className="h-4 w-4" aria-hidden="true" /></span>
                  Keep profiles close at hand
                </li>
              </ul>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-indigo-100/60">
              <Database className="h-3.5 w-3.5" aria-hidden="true" />
              Powered by the public GitHub REST API
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="features-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="section-eyebrow">Explore with context</p>
            <h2 id="features-heading" className="mt-1 text-2xl font-semibold tracking-tight">Everything you need to dig deeper</h2>
          </div>
          <Link to="/explore" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200">
            Start exploring <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="feature-card card p-5">
              <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${index % 2 === 0 ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300' : 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300'}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-semibold tracking-tight">{title}</h3>
              <p className="muted mt-2 text-sm leading-6">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <RecentProfiles />

      <section className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6" aria-labelledby="api-heading">
        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Database className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="api-heading" className="font-semibold">Thoughtful about your data</h2>
            <p className="muted mt-1 max-w-3xl text-sm leading-6">
              Profile information comes directly from GitHub. Favorites and recently viewed profiles are stored locally in this browser. Unauthenticated GitHub API requests are subject to rate limits.
            </p>
          </div>
        </div>
        <Link to="/about" className="btn-ghost shrink-0 self-start sm:self-auto">How it works</Link>
      </section>
    </div>
  );
}

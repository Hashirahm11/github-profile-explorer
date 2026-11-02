import PageHeader from '../components/common/PageHeader.jsx';

const stack = ['React 18', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'Lucide React', 'GitHub REST API'];

export default function About() {
  return (
    <div className="space-y-6">
      <PageHeader title="About Project" description="A portfolio project built to practise professional React development." />
      <section className="card space-y-3 p-6">
        <h2 className="font-semibold">What it does</h2>
        <p className="muted text-sm">
          GitHub Explorer fetches public profile and repository data from the GitHub REST API and presents it in a responsive dashboard with search,
          filters, statistics, favorites and recently viewed profiles.
        </p>
      </section>
      <section className="card p-6">
        <h2 className="font-semibold">Technology</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {stack.map((s) => <li key={s} className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">{s}</li>)}
        </ul>
      </section>
      <section className="card space-y-3 p-6">
        <h2 className="font-semibold">Good to know</h2>
        <ul className="muted list-disc space-y-2 pl-5 text-sm">
          <li>Requests are unauthenticated and limited by GitHub to 60 per hour per IP address.</li>
          <li>Only the 100 most recently updated public repositories are fetched, so star and language statistics reflect those repositories only.</li>
          <li>Favorites, recent profiles and your theme choice are saved in your browser (localStorage). Nothing is sent to a server.</li>
        </ul>
      </section>
    </div>
  );
}

import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { BookMarked, Star, UserPlus, Users } from 'lucide-react';
import { formatNumber } from '../../utils/format.js';
import { languageColor } from '../../utils/languages.js';

function StatCard({ icon: Icon, label, value, note }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <span className="muted text-sm">{label}</span>
        <Icon className="h-4 w-4 text-indigo-500" aria-hidden="true" />
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{formatNumber(value)}</p>
      {note && <p className="muted mt-1 text-xs">{note}</p>}
    </div>
  );
}

const ChartTip = ({ active, payload }) =>
  active && payload?.length ? (
    <div className="card px-3 py-2 text-xs">{payload[0].name}: <strong>{payload[0].value}</strong> repos</div>
  ) : null;

export default function StatsSection({ user, repos }) {
  const { totalStars, languages } = useMemo(() => {
    const counts = {};
    let stars = 0;
    repos.forEach((r) => {
      stars += Number(r.stargazers_count) || 0;
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
    const top = sorted.slice(0, 6);
    const rest = sorted.slice(6).reduce((sum, l) => sum + l.value, 0);
    return { totalStars: stars, languages: rest ? [...top, { name: 'Other', value: rest }] : top };
  }, [repos]);

  const total = languages.reduce((s, l) => s + l.value, 0);

  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="mb-3 text-lg font-semibold">Statistics</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={BookMarked} label="Public repositories" value={user.public_repos} />
        <StatCard icon={Users} label="Followers" value={user.followers} />
        <StatCard icon={UserPlus} label="Following" value={user.following} />
        <StatCard icon={Star} label="Stars (fetched repos)" value={totalStars} note={`From ${repos.length} fetched repos`} />
      </div>

      <div className="card mt-4 p-5">
        <h3 className="font-medium">Most-used languages</h3>
        {languages.length === 0 ? (
          <p className="muted mt-3 text-sm">No language data is available for the fetched repositories.</p>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
            <div className="h-48 w-48 shrink-0" role="img" aria-label="Language distribution chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={languages} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2} stroke="none">
                    {languages.map((l, i) => <Cell key={l.name} fill={languageColor(l.name, i)} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="grid w-full flex-1 gap-2 sm:grid-cols-2">
              {languages.map((l, i) => (
                <li key={l.name} className="flex items-center gap-2 text-sm">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: languageColor(l.name, i) }} aria-hidden="true" />
                  <span className="flex-1 truncate">{l.name}</span>
                  <span className="muted tabular-nums">{Math.round((l.value / total) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="muted mt-4 border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
          Stars and languages are calculated from the {repos.length} public repositories retrieved by this app (up to the 100 most recently
          updated). They are not complete account-wide GitHub statistics. Repository, follower and following counts come directly from the profile.
        </p>
      </div>
    </section>
  );
}

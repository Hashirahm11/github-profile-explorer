import { NavLink } from 'react-router-dom';
import { ExternalLink, FolderGit2, Heart, Info, LayoutDashboard, Users, X } from 'lucide-react';
import { useProfiles } from '../../context/FavoritesContext.jsx';

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/explore', label: 'Explore Users', icon: Users },
  { to: '/repositories', label: 'Repository Explorer', icon: FolderGit2 },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/about', label: 'About Project', icon: Info },
];

export default function Sidebar({ open, onClose }) {
  const { favorites } = useProfiles();
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r border-slate-200 bg-white p-4 transition-transform dark:border-slate-800 dark:bg-slate-950 lg:top-16 lg:z-20 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="font-semibold">Menu</span>
          <button type="button" onClick={onClose} aria-label="Close navigation menu" className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
                }`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="flex-1">{label}</span>
              {to === '/favorites' && favorites.length > 0 && (
                <span className="text-xs tabular-nums text-slate-400">{favorites.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 border-t border-slate-200 pt-5 dark:border-slate-800">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">About</p>
          <a href="https://github.com/Hashirahm11/github-profile-explorer" target="_blank" rel="noopener noreferrer"
            className="mt-2 flex min-h-[42px] items-center gap-3 rounded-xl px-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            View source code
          </a>
          <p className="mt-4 px-3 text-xs leading-5 text-slate-400">A simple workspace for exploring public GitHub profiles.</p>
        </div>
      </aside>
    </>
  );
}

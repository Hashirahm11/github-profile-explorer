import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Check, Copy, ExternalLink, Globe, Heart, MapPin, Twitter } from 'lucide-react';
import { useProfiles } from '../../context/FavoritesContext.jsx';
import { formatDate, normalizeUrl } from '../../utils/format.js';

function InfoRow({ icon: Icon, label, children }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
      <span className="sr-only">{label}:</span>
      <span className={`min-w-0 truncate ${children ? '' : 'muted italic'}`}>{children || 'Not provided'}</span>
    </li>
  );
}

export default function ProfileCard({ user, onViewRepos }) {
  const { isFavorite, toggleFavorite } = useProfiles();
  const [copied, setCopied] = useState(false);
  const favorite = isFavorite(user.login);
  const blog = normalizeUrl(user.blog);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(user.html_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this profile URL:', user.html_url);
    }
  };

  return (
    <section className="card p-5 sm:p-6" aria-label={`Profile of ${user.login}`}>
      <div className="flex flex-col gap-6 sm:flex-row">
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="128" height="128"
          className="h-24 w-24 shrink-0 rounded-full border-4 border-white bg-slate-200 object-cover shadow-md dark:border-slate-800 sm:h-32 sm:w-32" />
        <div className="min-w-0 flex-1">
          <h1 className="break-words text-2xl font-semibold tracking-tight">{user.name || user.login}</h1>
          <p className="muted text-sm">@{user.login}</p>
          <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${user.bio ? '' : 'muted italic'}`}>{user.bio || 'This user has not added a bio.'}</p>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            <InfoRow icon={MapPin} label="Location">{user.location}</InfoRow>
            <InfoRow icon={Building2} label="Company">{user.company}</InfoRow>
            <InfoRow icon={Globe} label="Website">
              {blog && <a href={blog} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-300">{user.blog.trim()}</a>}
            </InfoRow>
            <InfoRow icon={Twitter} label="Twitter">
              {user.twitter_username && (
                <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-300">@{user.twitter_username}</a>
              )}
            </InfoRow>
            <InfoRow icon={Calendar} label="Joined GitHub">{user.created_at && `Joined ${formatDate(user.created_at)}`}</InfoRow>
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Visit GitHub Profile
            </a>
            <button type="button" onClick={onViewRepos} className="btn-ghost">View Repositories</button>
            <button type="button" onClick={() => toggleFavorite(user)} aria-pressed={favorite}
              className={`btn-ghost ${favorite ? '!border-pink-300 !text-pink-600 dark:!border-pink-500/50 dark:!text-pink-300' : ''}`}>
              <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} aria-hidden="true" />
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button type="button" onClick={copyUrl} className="btn-ghost" aria-live="polite">
              {copied ? <Check className="h-4 w-4 text-green-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy profile URL'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

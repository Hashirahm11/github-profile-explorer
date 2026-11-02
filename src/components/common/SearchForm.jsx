import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d-]{0,38})$/i;

export default function SearchForm({ basePath = '/user', placeholder = 'Search a GitHub username, e.g. torvalds', buttonLabel = 'Search' }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const inputId = useId();

  const handleSubmit = (event) => {
    event.preventDefault(); // Enter key and the button both land here
    const name = value.trim().replace(/^@/, '');
    if (!name) return setError('Enter a GitHub username to search.');
    if (!USERNAME_PATTERN.test(name)) return setError('Usernames use letters, numbers and hyphens only (max 39 characters).');
    setError('');
    navigate(`${basePath}/${encodeURIComponent(name)}`);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId} className="sr-only">GitHub username</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input id={inputId} type="text" value={value} onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder} autoComplete="off" spellCheck="false" className="input pl-9"
            aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} />
        </div>
        <button type="submit" className="btn-primary sm:px-6">{buttonLabel}</button>
      </div>
      {error && <p id={`${inputId}-error`} role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </form>
  );
}

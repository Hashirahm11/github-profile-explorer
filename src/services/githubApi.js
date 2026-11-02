// All GitHub REST API access lives here so UI components never call fetch directly.
const BASE_URL = 'https://api.github.com';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes: avoids duplicate requests and saves rate limit

export class GitHubError extends Error {
  // type: 'not_found' | 'rate_limit' | 'network' | 'malformed' | 'unknown'
  constructor(type, message, extra = {}) {
    super(message);
    this.type = type;
    Object.assign(this, extra);
  }
}

async function request(path, signal) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      signal,
      headers: { Accept: 'application/vnd.github+json' },
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new GitHubError('network', 'Could not reach GitHub.');
  }

  if (response.status === 404) throw new GitHubError('not_found', 'User not found.');

  if (response.status === 403 || response.status === 429) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    const reset = Number(response.headers.get('x-ratelimit-reset'));
    if (remaining === '0' || response.status === 429) {
      throw new GitHubError('rate_limit', 'GitHub API rate limit reached.', {
        resetAt: reset ? new Date(reset * 1000) : null,
      });
    }
    throw new GitHubError('unknown', 'GitHub refused the request.');
  }

  if (!response.ok) throw new GitHubError('unknown', `GitHub responded with status ${response.status}.`);

  try {
    return await response.json();
  } catch {
    throw new GitHubError('malformed', 'GitHub returned an unreadable response.');
  }
}

const cache = new Map();
async function cached(key, loader) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < CACHE_TTL) return hit.value;
  const value = await loader(); // aborted/failed requests throw and are never cached
  cache.set(key, { value, time: Date.now() });
  return value;
}

export function getUser(username, signal) {
  const name = encodeURIComponent(username);
  return cached(`user:${username.toLowerCase()}`, async () => {
    const data = await request(`/users/${name}`, signal);
    if (!data || typeof data !== 'object' || !data.login) throw new GitHubError('malformed', 'Incomplete profile data.');
    return data;
  });
}

export function getRepos(username, signal) {
  const name = encodeURIComponent(username);
  return cached(`repos:${username.toLowerCase()}`, async () => {
    const data = await request(`/users/${name}/repos?per_page=100&sort=updated`, signal);
    if (!Array.isArray(data)) throw new GitHubError('malformed', 'Incomplete repository data.');
    return data.filter((r) => r && r.name);
  });
}

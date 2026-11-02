import { useCallback, useEffect, useState } from 'react';
import { getRepos, getUser } from '../services/githubApi.js';

const IDLE = { username: null, status: 'idle', user: null, repos: [], error: null, reposError: null };

// Loads a profile and its repositories. AbortController stops outdated requests from updating the UI.
export default function useGitHubProfile(username) {
  const [state, setState] = useState(IDLE);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!username) return undefined;
    const controller = new AbortController();
    setState({ ...IDLE, username, status: 'loading' });

    (async () => {
      try {
        const user = await getUser(username, controller.signal);
        let repos = [];
        let reposError = null;
        try {
          repos = await getRepos(username, controller.signal);
        } catch (err) {
          if (err.name === 'AbortError') throw err;
          reposError = err; // profile still renders; repositories show their own error
        }
        if (!controller.signal.aborted) setState({ username, status: 'success', user, repos, error: null, reposError });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setState({ ...IDLE, username, status: 'error', error: err });
      }
    })();

    return () => controller.abort();
  }, [username, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  // Avoid flashing the previous user's data for one frame after the username changes.
  const stale = Boolean(username) && state.username !== username;
  return { ...(stale ? { ...IDLE, status: 'loading' } : state), retry };
}

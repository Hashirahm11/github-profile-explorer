import { createContext, useCallback, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const ProfilesContext = createContext(null);
const MAX_RECENT = 8;

// Only the fields needed for cards are stored, never the full API response.
const toSummary = (u) => ({ login: u.login, avatar_url: u.avatar_url, name: u.name || null });
const same = (a, b) => String(a).toLowerCase() === String(b).toLowerCase();

export function ProfilesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('gh-explorer-favorites', []);
  const [recent, setRecent] = useLocalStorage('gh-explorer-recent', []);

  const isFavorite = useCallback((login) => favorites.some((f) => same(f.login, login)), [favorites]);

  const toggleFavorite = useCallback(
    (user) =>
      setFavorites((list) =>
        list.some((f) => same(f.login, user.login))
          ? list.filter((f) => !same(f.login, user.login))
          : [toSummary(user), ...list]
      ),
    [setFavorites]
  );

  const addRecent = useCallback(
    (user) => setRecent((list) => [toSummary(user), ...list.filter((r) => !same(r.login, user.login))].slice(0, MAX_RECENT)),
    [setRecent]
  );

  const clearRecent = useCallback(() => setRecent([]), [setRecent]);

  const value = useMemo(
    () => ({ favorites, recent, isFavorite, toggleFavorite, addRecent, clearRecent }),
    [favorites, recent, isFavorite, toggleFavorite, addRecent, clearRecent]
  );
  return <ProfilesContext.Provider value={value}>{children}</ProfilesContext.Provider>;
}

export const useProfiles = () => useContext(ProfilesContext);

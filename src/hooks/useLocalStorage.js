import { useEffect, useState } from 'react';

// useState that persists to localStorage and never throws if storage is unavailable.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : initialValue;
      return Array.isArray(initialValue) && !Array.isArray(parsed) ? initialValue : parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
  }, [key, value]);

  return [value, setValue];
}

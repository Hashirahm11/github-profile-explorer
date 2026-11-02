export function formatDate(iso) {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return 'Unknown';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function timeAgo(iso) {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return 'Unknown';
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days < 1) return 'today';
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (days < 365) { const m = Math.floor(days / 30); return `${m} month${m === 1 ? '' : 's'} ago`; }
  const y = Math.floor(days / 365);
  return `${y} year${y === 1 ? '' : 's'} ago`;
}

export const formatNumber = (n) =>
  new Intl.NumberFormat('en-US', { notation: n >= 100000 ? 'compact' : 'standard' }).format(Number(n) || 0);

// GitHub "blog" values often omit the protocol.
export function normalizeUrl(value) {
  const v = typeof value === 'string' ? value.trim() : '';
  if (!v) return null;
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

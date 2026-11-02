const COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219', HTML: '#e34c26',
  CSS: '#563d7c', C: '#555555', 'C++': '#f34b7d', 'C#': '#178600', Go: '#00ADD8', Rust: '#dea584',
  Ruby: '#701516', PHP: '#4F5D95', Shell: '#89e051', Vue: '#41b883', Swift: '#F05138', Kotlin: '#A97BFF',
  Dart: '#00B4AB', SCSS: '#c6538c', 'Jupyter Notebook': '#DA5B0B', Lua: '#000080',
};
const FALLBACK = ['#6366f1', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export function languageColor(name, index = 0) {
  return COLORS[name] || FALLBACK[index % FALLBACK.length];
}

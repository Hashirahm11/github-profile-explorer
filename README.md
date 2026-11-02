# GitHub Explorer

A responsive GitHub Profile Explorer built with React, Vite and Tailwind CSS. Search any public GitHub user, browse their repositories and view language and star statistics. It uses the public GitHub REST API with no backend and no token.

## Main features

- Search any public username (button, Enter key or suggestion chips) with validation, loading skeletons and friendly errors
- Profile page: avatar, name, bio, location, company, website, Twitter, counts, join date, copy-URL and favorite actions
- Repository Explorer: search by name, filter by language, sort by updated / stars / forks / name
- Statistics: repositories, followers, following, stars and a language chart (calculated from fetched repos)
- Favorites and recently viewed profiles saved in localStorage
- Light and dark mode, responsive sidebar drawer, keyboard-friendly and accessible markup
- Handles 404, rate limits, network failures and incomplete API responses

## Technologies used

React 18, Vite, JavaScript (ES6+), Tailwind CSS, React Router DOM, Recharts, Lucide React, GitHub REST API.

## Screenshots

Create a `screenshots/` folder, add images (for example `home.png`, `profile.png`, `dark-mode.png`, `mobile.png`) and reference them here:

```md
![Home](screenshots/home.png)
![Profile](screenshots/profile.png)
```

## Folder structure

```
src/
  components/
    common/        SearchForm, SuggestionChips, Skeletons, StateMessage, ErrorState, PageHeader
    dashboard/     RecentProfiles, UserCard
    layout/        Layout, Header, Sidebar
    profile/       ProfileCard, StatsSection
    repositories/  RepoExplorer, RepoCard
  context/         ThemeContext, FavoritesContext (favorites + recently viewed)
  hooks/           useGitHubProfile, useLocalStorage, useDebounce
  pages/           Home, Explore, Profile, RepositoryExplorer, Favorites, About, NotFound
  services/        githubApi.js (all API requests)
  utils/           format.js, languages.js
  App.jsx  main.jsx  index.css
public/favicon.svg
```

## Installation

1. Install [Node.js](https://nodejs.org) 18 or newer.
2. Extract the ZIP and open the folder in Visual Studio Code.
3. Open the integrated terminal (Terminal > New Terminal) and run:

```bash
npm install
```

## Run locally

```bash
npm run dev
```

The terminal prints a local address (usually http://localhost:5173). Open it in your browser.

Other commands:

```bash
npm run build     # create the production build in dist/
npm run preview   # serve the production build locally
```

## GitHub API

The app uses two public endpoints:

- `https://api.github.com/users/{username}`
- `https://api.github.com/users/{username}/repos?per_page=100&sort=updated`

All requests live in `src/services/githubApi.js`. Responses are cached for 5 minutes and outdated requests are cancelled with `AbortController`.

## Rate limits

Unauthenticated requests are limited to 60 per hour per IP address. Each profile view uses 2 requests. When the limit is reached the app shows a message with the reset time. Repeat visits within 5 minutes use the in-memory cache.

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. Go to vercel.com, choose **Add New > Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`).
4. Add a `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }` so direct links to routes such as `/user/torvalds` work.
5. Click **Deploy**.

## Future improvements

- Optional GitHub token support for higher rate limits
- Repository pagination beyond 100 repos
- Profile comparison view
- Unit tests with Vitest and React Testing Library
- Contribution activity and README preview

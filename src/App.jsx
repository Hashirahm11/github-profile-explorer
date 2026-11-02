import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Explore = lazy(() => import('./pages/Explore.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const RepositoryExplorer = lazy(() => import('./pages/RepositoryExplorer.jsx'));
const Favorites = lazy(() => import('./pages/Favorites.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="user/:username" element={<Profile />} />
        <Route path="repositories" element={<RepositoryExplorer />} />
        <Route path="repositories/:username" element={<RepositoryExplorer />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

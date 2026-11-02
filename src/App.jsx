import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Profile from './pages/Profile.jsx';
import RepositoryExplorer from './pages/RepositoryExplorer.jsx';
import Favorites from './pages/Favorites.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

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

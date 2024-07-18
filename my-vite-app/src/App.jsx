import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkCreator from './components/LinkCreator.jsx';
import ProfilePage from './components/ProfilePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LinkCreator />} />
        <Route path="/profile/:name" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

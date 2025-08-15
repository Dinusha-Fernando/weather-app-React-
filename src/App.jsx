
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';
import AuthWrapper from './auth/AuthWrapper';
import Favorites from "./pages/Favorites.jsx";


function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:name" element={<CityDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </AuthWrapper>
  );
}

export default App;

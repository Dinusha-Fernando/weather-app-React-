
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';
import AuthWrapper from './auth/AuthWrapper';

function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:name" element={<CityDetails />} />
      </Routes>
    </AuthWrapper>
  );
}

export default App;

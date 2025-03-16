import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Authentification } from './pages/Authentification';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
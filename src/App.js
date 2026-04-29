import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Finance from './components/Finance';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
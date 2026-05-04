import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Finance from './components/Finance';
import TechnologySupport from './components/TechnologySupport';
import OffshoreHiring from './components/OffshoreHiring';

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
          <Route path="/technology-support" element={<TechnologySupport />} />
          <Route path="/offshore-hiring" element={<OffshoreHiring />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
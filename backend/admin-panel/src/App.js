import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import BlogEditor from './pages/BlogEditor';
import CareerList from './pages/CareerList';
import CareerEditor from './pages/CareerEditor';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/new" element={<BlogEditor />} />
          <Route path="/blogs/edit/:id" element={<BlogEditor />} />
          <Route path="/careers" element={<CareerList />} />
          <Route path="/careers/new" element={<CareerEditor />} />
          <Route path="/careers/edit/:id" element={<CareerEditor />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

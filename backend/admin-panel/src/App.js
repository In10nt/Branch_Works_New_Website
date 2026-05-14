import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import BlogEditor from './pages/BlogEditor';
import CareerList from './pages/CareerList';
import CareerEditor from './pages/CareerEditor';
import './App.css';
import './utils/axiosConfig'; // Import axios interceptor

function App() {
  return (
    <Router basename="/admin">
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/blogs" element={
          <ProtectedRoute>
            <Layout><BlogList /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/blogs/new" element={
          <ProtectedRoute>
            <Layout><BlogEditor /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/blogs/edit/:id" element={
          <ProtectedRoute>
            <Layout><BlogEditor /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/careers" element={
          <ProtectedRoute>
            <Layout><CareerList /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/careers/new" element={
          <ProtectedRoute>
            <Layout><CareerEditor /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/careers/edit/:id" element={
          <ProtectedRoute>
            <Layout><CareerEditor /></Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

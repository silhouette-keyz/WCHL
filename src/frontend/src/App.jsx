import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/LandingPage/HomePage';
import LoginPage from './pages/LoginPage';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { AuthProvider } from './auth'; // pastikan path-nya sesuai
import Layout from "./components/Layout/Layout";
import EventPage from "./pages/EventPage";
import ParticipantPage from "./pages/ParticipantPage";
import CertificatePage from "./pages/CertificatePage";
import AttendancePage from "./pages/AttendancePage";
import ProfilePage from "./pages/ProfilePage";
 
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Private Routes */}
          <Route path="/app" element={<PrivateRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<EventPage />} />
            <Route path="participants" element={<ParticipantPage />} />
            <Route path="attendances" element={<AttendancePage />} />
            <Route path="certificates" element={<CertificatePage />} />
          </Route>

          {/* Route Umum */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';

import Welcome from './pages/Welcome';
import Consent from './pages/Consent';
import Login from './pages/Login';
import PracticeDeck from './pages/PracticeDeck';
import PracticeCard from './pages/PracticeCard';
import Review from './pages/Review';
import ReminderSettings from './pages/ReminderSettings';
import SessionSummary from './pages/SessionSummary';
import ProgressDashboard from './pages/ProgressDashboard';
import DayComplete from './pages/DayComplete';
import Completion from './pages/Completion';

export default function App() {
  const { state } = useContext(AppContext);
  const { user } = state;

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Welcome />} />
      <Route path="/consent" element={<Consent />} />
      <Route path="/login" element={<Login />} />

      {/* Protected flow: require user */}
      <Route
        path="/practice/:day"
        element={user ? <PracticeDeck /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/card/:day/:index"
        element={user ? <PracticeCard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/review/:day"
        element={user ? <Review /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/reminder"
        element={user ? <ReminderSettings /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/summary/:day"
        element={user ? <SessionSummary /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/dashboard/:day"
        element={user ? <ProgressDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/day-complete/:day"
        element={user ? <DayComplete /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/completion"
        element={user ? <Completion /> : <Navigate to="/login" replace />}
      />

      {/* Catch‐all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

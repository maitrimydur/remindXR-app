// src/pages/SessionSummary.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { WORD_LISTS } from '../utils/constants';

export default function SessionSummary() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNum = parseInt(day, 10);

  const sessionData = state.sessions[dayNum];
  if (!sessionData) {
    navigate(`/practice/${dayNum}`);
    return null;
  }

  const responses = sessionData.responses;
  const total = WORD_LISTS[dayNum].words.length;
  const gotCount = responses.filter(r => r.result === 'got').length;

  const start = new Date(responses[0].timestamp);
  const end = new Date(responses[responses.length - 1].timestamp);
  const diffMs = end - start;
  const minutes = Math.floor(diffMs / 60000);
  const seconds = Math.ceil((diffMs % 60000) / 1000);
  const timeSpent = `${minutes}m ${seconds}s`;

  const pct = ((gotCount / total) * 100).toFixed(1);

  const handleContinue = () => {
    navigate(`/dashboard/${dayNum}`);
  };

  return (
    <div className="container">
      <Header title="Session Summary" backTo={`/review/${dayNum}`} />
      <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
        <div style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--color-text-dark)' }}>
          Time Spent
        </div>
        <div style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
          {timeSpent}
        </div>

        <div style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--color-text-dark)' }}>
          Score
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
          {gotCount}/{total} ({pct}%)
        </div>

        <Button large onClick={handleContinue}>
          View Progress
        </Button>
      </div>
    </div>
  );
}

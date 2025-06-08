// src/pages/SessionSummary.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { WORD_LISTS } from '../utils/constants';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

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
  const wrongCount = total - gotCount;

  // Calculate total time by summing per-response durations
  const totalSeconds = responses.reduce((acc, r) => {
    const parts = r.timeSpent.split(' ');
    let mins = 0;
    let secs = 0;
    parts.forEach(p => {
      if (p.endsWith('m')) mins = parseInt(p.replace('m', ''), 10);
      if (p.endsWith('s')) secs = parseInt(p.replace('s', ''), 10);
    });
    return acc + mins * 60 + secs;
  }, 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeSpent = `${minutes}m ${seconds}s`;

  const pct = ((gotCount / total) * 100).toFixed(1);

  // Data for the pie chart
  const data = [
    { name: 'Correct', value: gotCount },
    { name: 'Incorrect', value: wrongCount },
  ];
  const COLORS = ['#4CAF50', '#F44336'];

  const handleContinue = () => {
    navigate(`/dashboard/${dayNum}`);
  };

  return (
    <div className="container">
      <Header title="Session Summary" backTo={`/review/${dayNum}`} />
      <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
        {/* Pie chart showing correct vs incorrect */}
        <div style={{ width: 200, height: 200, margin: '0 auto 24px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

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

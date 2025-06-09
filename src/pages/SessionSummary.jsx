import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { WORD_LISTS } from '../utils/constants';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import './SessionSummary.css';

export default function SessionSummary() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNum = parseInt(day, 10);

  // Redirect if no session data
  const sessionData = state.sessions[dayNum];
  if (!sessionData) {
    navigate(`/practice/${dayNum}`);
    return null;
  }

  const responses = sessionData.responses;
  const total = WORD_LISTS[dayNum].words.length;
  const gotCount = responses.filter(r => r.result === 'got').length;
  const wrongCount = total - gotCount;

  // Sum up total time in seconds
  const totalSeconds = responses.reduce((acc, r) => {
    let mins = 0;
    let secs = 0;
    r.timeSpent.split(' ').forEach(p => {
      if (p.endsWith('m')) mins = parseInt(p, 10);
      if (p.endsWith('s')) secs = parseInt(p, 10);
    });
    return acc + mins * 60 + secs;
  }, 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeSpent = `${minutes}m ${seconds}s`;

  const pct = ((gotCount / total) * 100).toFixed(1);

  const data = [
    { name: 'Correct', value: gotCount },
    { name: 'Incorrect', value: wrongCount },
  ];
  const COLORS = ['#1E40AF', '#60A5FA'];

  const handleContinue = () => {
    navigate(`/dashboard/${dayNum}`);
  };

  return (
    <div className="container">
      <Header title="Session" backTo={`/review/${dayNum}`} />

      <div className="content session-summary-content">
        {/* Title Card */}
        <div className="session-summary-title-card">
          <h2>Session Summary</h2>
        </div>

        {/* Stats Card */}
        <div className="session-summary-stats-card">
          <div className="stats-row">
            <span className="label">Time Spent</span>
            <span className="value">{timeSpent}</span>
          </div>

          <div className="stats-row">
            <span className="label">Score</span>
            <span className="value">{gotCount}/{total} ({pct}%)</span>
          </div>

          {/* Chart + Legend */}
          <div className="chart-section">
            <div className="session-summary-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    label
                  >
                    {data.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="legend">
              <div className="legend-item">
                <span
                  className="legend-swatch"
                  style={{ backgroundColor: COLORS[0] }}
                />
                Got It
              </div>
              <div className="legend-item">
                <span
                  className="legend-swatch"
                  style={{ backgroundColor: COLORS[1] }}
                />
                Struggled
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          large
          className="session-summary-button"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

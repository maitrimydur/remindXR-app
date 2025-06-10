// src/pages/SessionSummary.jsx
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

  // 1) fetch session
  const sessionData = state.sessions[dayNum];
  if (!sessionData) {
    navigate(`/practice/${dayNum}`);
    return null;
  }

  // 2) basic stats
  const responses = sessionData.responses || [];
  const totalWords = WORD_LISTS[dayNum].words.length;
  const gotCount   = responses.filter(r => r.result === 'got').length;
  const wrongCount = totalWords - gotCount;

  // 3) calculate elapsed seconds: primary = endTime-startTime, fallback = sum of timeSpent
  let totalSeconds = 0;

  if (typeof sessionData.startTime === 'number' && typeof sessionData.endTime === 'number') {
    totalSeconds = Math.max(0, Math.round((sessionData.endTime - sessionData.startTime) / 1000));
  } else {
    // fallback sum of per-card times (expects "Xm Ys" strings)
    totalSeconds = responses.reduce((acc, { timeSpent }) => {
      if (typeof timeSpent === 'string') {
        const ms = timeSpent.match(/(\d+)\s*m/i);
        const ss = timeSpent.match(/(\d+)\s*s/i);
        const m = ms ? parseInt(ms[1], 10) : 0;
        const s = ss ? parseInt(ss[1], 10) : 0;
        return acc + m * 60 + s;
      }
      if (typeof timeSpent === 'number') {
        return acc + timeSpent;
      }
      return acc;
    }, 0);
  }

  // 4) format for display
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeSpent = `${minutes}m ${seconds}s`;

  // 5) score %
  const pct = ((gotCount / totalWords) * 100).toFixed(1);

  // 6) prepare pie data
  const data   = [
    { name: 'Correct',   value: gotCount   },
    { name: 'Incorrect', value: wrongCount },
  ];
  const COLORS = ['#1E40AF', '#60A5FA'];

  // 7) render
  return (
    <div className="container">
      <Header title="Session" backTo={`/review/${dayNum}`} />

      <div className="content session-summary-content">
        <div className="session-summary-title-card">
          <h2>Session Summary</h2>
        </div>

        <div className="session-summary-stats-card">
          <div className="stats-row">
            <span className="label">Time Spent</span>
            <span className="value">{timeSpent}</span>
          </div>
          <div className="stats-row">
            <span className="label">Score</span>
            <span className="value">{gotCount}/{totalWords} ({pct}%)</span>
          </div>

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
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              <div className="legend-item">
                <span className="legend-swatch" style={{ backgroundColor: COLORS[0] }} />
                Got It
              </div>
              <div className="legend-item">
                <span className="legend-swatch" style={{ backgroundColor: COLORS[1] }} />
                Struggled
              </div>
            </div>
          </div>
        </div>

        <Button
          large
          className="session-summary-button"
          onClick={() => navigate(`/dashboard/${dayNum}`)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

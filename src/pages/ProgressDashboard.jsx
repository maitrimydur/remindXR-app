// src/pages/ProgressDashboard.jsx
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './ProgressDashboard.css';

export default function ProgressDashboard() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNum = parseInt(day, 10);

  // Build per-day data
  const data = Array.from({ length: dayNum }, (_, i) => {
    const d = i + 1;
    const sess = state.sessions[d];
    if (!sess) return { day: d, score: 0, time: 0 };

    const total = sess.responses.length;
    const gotCount = sess.responses.filter(r => r.result === 'got').length;
    const score = Math.round((gotCount / total) * 100);

    const totalSeconds = sess.responses.reduce((acc, r) => {
      const [mStr, sStr] = r.timeSpent.split(' ');
      const m = parseInt(mStr, 10);
      const s = parseInt(sStr, 10);
      return acc + m * 60 + s;
    }, 0);
    const avgSec = Math.round(totalSeconds / total);

    return { day: d, score, time: avgSec };
  });

  // Overall averages
  const overallPercent =
    data.reduce((sum, d) => sum + d.score, 0) / (data.length || 1);
  const overallAvgSec =
    data.reduce((sum, d) => sum + d.time, 0) / (data.length || 1);
  const overallAvgMin = Math.floor(overallAvgSec / 60);
  const overallAvgSecRem = Math.round(overallAvgSec % 60);

  const handleContinue = () => navigate(`/day-complete/${dayNum}`);
  const maxTime = Math.max(...data.map(d => d.time), 0);

  return (
    <div className="container progress-dashboard-page">
      <Header title="Progress" backTo={`/summary/${dayNum}`} />

      <div className="progress-dashboard-content">
        <div className="progress-dashboard-card">
          <h2>Progress Dashboard</h2>

          {/* Average Score */}
          <div className="chart-label">Average Score</div>
          <div className="progress-dashboard-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} />
                <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(val, name) =>
                  name === 'score' ? `${val}%` : `${val}s`
                } />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-accent)"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Average Time */}
          <div className="chart-label">Average Time (sec)</div>
          <div className="progress-dashboard-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} />
                <YAxis domain={[0, maxTime]} />
                <Tooltip formatter={v => `${v}s`} />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="var(--color-primary-dark)"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Summary metrics */}
          <div className="summary-metrics">
            <div className="metric">
              <span className="metric-label">Avg. Score</span>
              <span className="metric-value">
                {Math.round(overallPercent)}%
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Avg. Time</span>
              <span className="metric-value">
                {overallAvgMin}m {overallAvgSecRem}s
              </span>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <Button
          large
          className="progress-dashboard-button"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

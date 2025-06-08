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

export default function ProgressDashboard() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNum = parseInt(day, 10);

  // Build data array: each completed day has day number, score %, and avg time in seconds
  const data = Array.from({ length: dayNum }, (_, i) => {
    const d = i + 1;
    const sess = state.sessions[d];
    if (!sess) {
      return { day: d, score: 0, time: 0 };
    }
    const total = sess.responses.length;
    const gotCount = sess.responses.filter((r) => r.result === 'got').length;
    const score = Math.round((gotCount / total) * 100);
    const totalSeconds = sess.responses.reduce((acc, r) => {
      const [minsStr, secsStr] = r.timeSpent.split(' ');
      const m = parseInt(minsStr.replace('m', ''), 10);
      const s = parseInt(secsStr.replace('s', ''), 10);
      return acc + m * 60 + s;
    }, 0);
    const avgSec = Math.round(totalSeconds / total);
    return { day: d, score, time: avgSec };
  });

  // Overall averages
  const overallPercent =
    data.reduce((sum, d) => sum + d.score, 0) / (data.length || 1);
  const overallAvgSec = data.reduce((sum, d) => sum + d.time, 0) / (data.length || 1);
  const overallAvgMin = Math.floor(overallAvgSec / 60);
  const overallAvgSecRem = Math.round(overallAvgSec % 60);

  const handleContinue = () => {
    navigate(`/day-complete/${dayNum}`);
  };

  const maxTime = Math.max(...data.map((d) => d.time), 0);

  return (
    <div className="container">
      <Header title="Progress" backTo={`/summary/${dayNum}`} />
      <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-primary-dark)',
            marginBottom: '16px',
          }}
        >
          Progress Dashboard
        </h2>

        {/* Average Score Chart */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-dark)',
              marginBottom: '8px',
            }}
          >
            Average Score
          </div>
          <div style={{ width: 320, height: 200, margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  label={{ value: 'Day', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  formatter={(value, name) =>
                    name === 'score' ? `${value}%` : `${value}s`
                  }
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4CAF50"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Time Chart */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-dark)',
              marginBottom: '8px',
            }}
          >
            Average Time (sec)
          </div>
          <div style={{ width: 320, height: 200, margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  label={{ value: 'Day', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis domain={[0, maxTime]} />
                <Tooltip formatter={(value) => `${value}s`} />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="#1e40af"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary metrics */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '24px',
            maxWidth: '360px',
            margin: '0 auto',
          }}
        >
          <div>
            <div
              style={{ fontSize: '1rem', color: 'var(--color-text-dark)' }}
            >
              Avg. Score
            </div>
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-primary-dark)',
              }}
            >
              {Math.round(overallPercent)}%
            </div>
          </div>
          <div>
            <div
              style={{ fontSize: '1rem', color: 'var(--color-text-dark)' }}
            >
              Avg. Time
            </div>
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-primary-dark)',
              }}
            >
              {overallAvgMin}m {overallAvgSecRem}s
            </div>
          </div>
        </div>

        <Button large onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

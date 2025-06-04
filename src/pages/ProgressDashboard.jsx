// src/pages/ProgressDashboard.jsx
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Chart from '../components/Chart';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';

export default function ProgressDashboard() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNum = parseInt(day, 10);

  // Gather days up to dayNum
  const daysCompleted = Array.from({ length: dayNum }, (_, i) => i + 1);

  // Build arrays for percentages and average times
  const percents = [];
  const avgTimes = [];
  daysCompleted.forEach((d) => {
    const sess = state.sessions[d];
    if (!sess) return;
    const total = sess.responses.length;
    const gotCount = sess.responses.filter((r) => r.result === 'got').length;
    const p = Math.round((gotCount / total) * 100);
    percents.push(p);

    const totalSeconds = sess.responses.reduce((acc, r) => {
      const [minsStr, secsStr] = r.timeSpent.split(' ');
      const m = parseInt(minsStr.replace('m', ''), 10);
      const s = parseInt(secsStr.replace('s', ''), 10);
      return acc + m * 60 + s;
    }, 0);
    const avgSec = Math.round(totalSeconds / total);
    avgTimes.push(avgSec);
  });

  // Overall averages
  const overallPercent = Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);
  const overallAvgSec = Math.round(avgTimes.reduce((a, b) => a + b, 0) / avgTimes.length);
  const overallAvgMin = Math.floor(overallAvgSec / 60);
  const overallAvgSecRem = overallAvgSec % 60;

  const handleContinue = () => {
    // Show Day-complete thank you screen for this day
    navigate(`/day-complete/${dayNum}`);
  };

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

        {/* Retention Curve */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '1rem', color: 'var(--color-text-dark)', marginBottom: '8px' }}>
            Retention Curve
          </div>
          <Chart dataPoints={percents} width={320} height={200} />
        </div>

        {/* Average Time Chart (scaled to 0–100) */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '1rem', color: 'var(--color-text-dark)', marginBottom: '8px' }}>
            Avg Time (sec)
          </div>
          <Chart
            dataPoints={avgTimes.map((s) => Math.min(Math.round((s / 600) * 100), 100))}
            width={320}
            height={200}
          />
        </div>

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
            <div style={{ fontSize: '1rem', color: 'var(--color-text-dark)' }}>Avg. Score</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
              {overallPercent}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1rem', color: 'var(--color-text-dark)' }}>Avg. Time</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
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

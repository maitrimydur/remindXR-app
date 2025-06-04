// src/pages/ProgressDashboard.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Chart from '../components/Chart';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';

export default function ProgressDashboard() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  // Gather up to 8 days of data that exist
  const daysCompleted = Object.keys(state.sessions)
    .map((d) => parseInt(d, 10))
    .sort((a, b) => a - b);

  if (daysCompleted.length === 0) {
    // If no days completed yet, redirect to Day 1 practice
    navigate('/practice/1');
    return null;
  }

  // Build arrays of percentages and average times
  const percents = [];
  const avgTimes = []; // in seconds
  daysCompleted.forEach((d) => {
    const sess = state.sessions[d];
    const total = sess.responses.length;
    const gotCount = sess.responses.filter((r) => r.result === 'got').length;
    const p = Math.round((gotCount / total) * 100);
    percents.push(p);

    // Compute average time in seconds for day d
    const totalSeconds = sess.responses.reduce((acc, r) => {
      const [minsStr, secsStr] = r.timeSpent.split(' ');
      const m = parseInt(minsStr.replace('m', ''), 10);
      const s = parseInt(secsStr.replace('s', ''), 10);
      return acc + m * 60 + s;
    }, 0);
    const avgSec = Math.round(totalSeconds / total);
    avgTimes.push(avgSec);
  });

  // Compute overall avg score & avg time
  const overallPercent =
    Math.round(
      percents.reduce((a, b) => a + b, 0) / percents.length
    );
  const overallAvgSec =
    Math.round(
      avgTimes.reduce((a, b) => a + b, 0) / avgTimes.length
    );
  const overallAvgMin = Math.floor(overallAvgSec / 60);
  const overallAvgSecRem = overallAvgSec % 60;

  const handleContinue = () => {
    if (daysCompleted.includes(8)) {
      navigate('/completion');
    } else {
      const nextDay = Math.max(...daysCompleted) + 1;
      navigate(`/practice/${nextDay}`);
    }
  };

  return (
    <div className="container">
      <Header title="Progress" backTo="/" />
      <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
          Progress Dashboard
        </h2>

        {/* Retention Curve (Percents) */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '1rem', color: 'var(--color-text-dark)', marginBottom: '8px' }}>
            Retention Curve
          </div>
          <Chart dataPoints={percents} width={320} height={200} />
        </div>

        {/* Average Time Chart (in seconds) */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '1rem', color: 'var(--color-text-dark)', marginBottom: '8px' }}>
            Avg Time (sec)
          </div>
          {/* Convert avgTimes (seconds) to a 0–100 scale by dividing by max so it fits chart.
              For simplicity, we can scale 0–600 sec (10m) → 0–100%. */}
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

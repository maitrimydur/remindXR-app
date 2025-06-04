// src/pages/SessionSummary.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';

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
  const { responses, timeSpent } = sessionData;
  const total = responses.length;
  const gotCount = responses.filter((r) => r.result === 'got').length;
  const struggledCount = total - gotCount;
  const pct = Math.round((gotCount / total) * 100);

  // Build a simple pie‐chart
  const radius = 50;
  const center = 60;
  const angleGot = (gotCount / total) * 360;
  const angleStr = (struggledCount / total) * 360;
  function describeArc(cx, cy, r, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
      'L', cx, cy,
      'Z'
    ].join(' ');
  }
  function polarToCartesian(cx, cy, r, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  }
  const pathGot = describeArc(center, center, radius, 0, angleGot);
  const pathStr = describeArc(center, center, radius, angleGot, angleGot + angleStr);

  const handleContinue = () => {
    // After Session Summary, show the Dashboard for this day
    navigate(`/dashboard/${dayNum}`);
  };

  return (
    <div className="container">
      <Header title="Session Summary" backTo={`/review/${dayNum}`} />
      <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
        {/* Time Spent */}
        <div style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--color-text-dark)' }}>
          Time Spent
        </div>
        <div
          style={{
            marginBottom: '24px',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-text-dark)',
          }}
        >
          {timeSpent}
        </div>

        {/* Score */}
        <div style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--color-text-dark)' }}>
          Score
        </div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-primary-dark)',
            marginBottom: '8px',
          }}
        >
          {gotCount}/{total} ({pct}%)
        </div>

        {/* Pie chart */}
        <svg width="120" height="120" style={{ marginBottom: '16px' }}>
          <path d={pathGot} fill="var(--color-primary)" />
          <path d={pathStr} fill="var(--color-accent-light)" />
        </svg>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: 'var(--color-primary)',
                marginRight: '6px',
              }}
            ></span>
            <span style={{ color: 'var(--color-text-dark)', fontSize: '0.875rem' }}>Got It</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: 'var(--color-accent-light)',
                marginRight: '6px',
              }}
            ></span>
            <span style={{ color: 'var(--color-text-dark)', fontSize: '0.875rem' }}>Struggled</span>
          </div>
        </div>

        <Button large onClick={handleContinue}>
          View Progress
        </Button>
      </div>
    </div>
  );
}

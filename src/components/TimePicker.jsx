// src/components/TimePicker.jsx
import React from 'react';

export default function TimePicker({ time, onClick }) {
  return (
    <div className="timepicker" onClick={onClick}>
      <span style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>Reminder Time   </span>
      <span style={{ fontWeight: 700 }}>{time}</span>
      <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--color-accent)' }}>›</span>
    </div>
  );
}

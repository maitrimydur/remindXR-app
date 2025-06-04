// src/pages/DayComplete.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

export default function DayComplete() {
  const { day } = useParams();
  const dayNum = parseInt(day, 10);
  const navigate = useNavigate();

  const handleNext = () => {
    if (dayNum < 8) {
      navigate(`/practice/${dayNum + 1}`);
    } else {
      // After Day 8, go to final Completion screen
      navigate('/completion');
    }
  };

  return (
    <div className="container">
      <Header title={`Day ${dayNum} Complete`} backTo={`/dashboard/${dayNum}`} />
      <div className="content" style={{ paddingTop: '24px', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-primary-dark)',
            marginBottom: '16px',
          }}
        >
          Thank You for Day {dayNum}!
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-dark)', marginBottom: '24px' }}>
          Your responses for Day {dayNum} have been recorded.
        </p>
        <Button large onClick={handleNext}>
          {dayNum < 8 ? `Start Day ${dayNum + 1}` : 'Finish'}
        </Button>
      </div>
    </div>
  );
}

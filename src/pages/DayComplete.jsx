// src/pages/DayComplete.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import './DayComplete.css';

export default function DayComplete() {
  const { day } = useParams();
  const dayNum = parseInt(day, 10);
  const navigate = useNavigate();

  const handleNext = () => {
    if (dayNum < 8) {
      navigate(`/practice/${dayNum + 1}`);
    } else {
      navigate('/completion');
    }
  };

  return (
    <div className="container day-complete-page">
      <Header title={`Day ${dayNum} Complete`} backTo={`/dashboard/${dayNum}`} />

      {/* semi-transparent card that ends 20px below “recorded” */}
      <div className="content day-complete-content">
        <h2 className="day-complete-title">
          Thank You for Day {dayNum}!
        </h2>
        <p className="day-complete-text">
          Your responses for Day {dayNum} have been recorded.
        </p>
      </div>

      {/* button sits immediately below that box */}
      <Button large className="day-complete-btn" onClick={handleNext}>
        {dayNum < 8 ? `Start Day ${dayNum + 1}` : 'Finish'}
      </Button>
    </div>
  );
}

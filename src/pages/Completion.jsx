// src/pages/Completion.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';

export default function Completion() {
  const { resetAll } = useContext(AppContext);
  const navigate = useNavigate();

  const handleFinish = () => {
    resetAll();
    navigate('/');
  };

  return (
    <div className="container">
      <Header title="All Done!" backTo="/" />
      <div className="content" style={{ paddingTop: '24px', textAlign: 'center' }}>
        <div className="completion-card">
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--color-primary-dark)',
              marginBottom: '12px',
            }}
          >
            Thank You for Your Participation!
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
            All eight days are complete. Your data have been recorded. Feel free to exit or revisit your progress any time.
          </p>
        </div>

        <Button large onClick={handleFinish}>
          Finish
        </Button>
      </div>
    </div>
  );
}

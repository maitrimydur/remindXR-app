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
    // Reset everything and go back to Welcome
    resetAll();
    navigate('/');
  };

  return (
    <div className="container">
      <Header title="Completion" backTo="/" />
      <div className="content" style={{ paddingTop: '24px' }}>
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
            Your data has been recorded. Please check your email for further instructions.
            Feel free to explore more features.
          </p>
        </div>

        <Button large onClick={handleFinish}>
          Finish
        </Button>
      </div>
    </div>
  );
}

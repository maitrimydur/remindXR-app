// src/pages/PracticeDeck.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { WORD_LISTS } from '../utils/constants';

export default function PracticeDeck() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { day } = useParams(); // string, '1'..'8'
  const dayNum = parseInt(day, 10);
  const sessionData = state.sessions[dayNum];

  useEffect(() => {
    // If day > 1, ensure previous day was completed:
    if (dayNum > 1 && !state.sessions[dayNum - 1]) {
      navigate(`/practice/${dayNum - 1}`);
    }
  }, [dayNum, state.sessions, navigate]);

  const listObj = WORD_LISTS[dayNum];
  if (!listObj) {
    return (
      <div className="container">
        <Header title="Practice Deck" backTo="/" />
        <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
          <p>Invalid day. Redirecting…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header title="Practice Deck" backTo="/" />
      <div className="content" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
          {listObj.title}
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-dark)', marginBottom: '24px' }}>
          Let’s review {listObj.words.length} practice questions.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
          {listObj.words.map((w, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--color-divider)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                minWidth: '100px',
                textAlign: 'center',
              }}
            >
              {w.text}
            </div>
          ))}
        </div>

        <Button
          large
          onClick={() => {
            // If already completed, go to review; else start card 0
            if (sessionData) {
              navigate(`/review/${dayNum}`);
            } else {
              navigate(`/card/${dayNum}/0`);
            }
          }}
        >
          {sessionData ? 'Review Answers' : 'Begin'}
        </Button>
      </div>
    </div>
  );
}

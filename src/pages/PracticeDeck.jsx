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
  const { day } = useParams(); 
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
        <div
          className="content"
          style={{
            textAlign: 'center',
            paddingTop: '24px',
          }}
        >
          <p>Invalid day. Redirecting…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header title="Practice Deck" backTo="/" />
      <div
        className="content"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        {/* Blue card wrapper */}
        <div
          style={{
            backgroundColor: 'rgba(37, 99, 235, 0.9)',
            borderRadius: '24px',
            padding: '24px',
            maxWidth: '380px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* “Practice Session #X:” */}
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 600,
              color: '#DBEAFE',
              margin: 0,
              marginBottom: '12px',
              lineHeight: 1.2,
            }}
          >
            Practice Session #{dayNum}:
          </h2>

          {/* “Grocery Staples” */}
          <h3
            style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: '#ffffff',
              margin: 0,
              marginTop: '30px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {listObj.title}
          </h3>

          {/* Subtitle “Let’s review 8 practice questions.” */}
          <p
            style={{
              fontSize: '1rem',
              color: '#DBEAFE',
              margin: 0,
              marginBottom: '30px',
              textAlign: 'center',
              fontWeight: 300,
            }}
          >
            Let’s review {listObj.words.length} practice questions.
          </p>

          {/* Two‐column grid of word “pills” */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '32px',
            }}
          >
            {listObj.words.map((w, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '8px 12px',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--color-primary)',
                  textAlign: 'center',
                  cursor: 'default',
                  boxSizing: 'border-box',
                  // If you ever want them to be clickable, swap <div> for a <button> or <Link>
                }}
              >
                {w.text}
              </div>
            ))}
          </div>

          {/* “Begin” button (full‐width, darker blue) */}
          <Button
            large
            style={{
              marginTop: '15px',
              width: '100%',
              backgroundColor: 'var(--color-primary-dark)',
              color: '#ffffff',
              borderRadius: '25px',
              padding: '20px 0',
              fontSize: '1.8rem',
              fontWeight: 600,
            }}
            onClick={() => {
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
    </div>
  );
}
